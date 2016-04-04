const AWS = require( 'aws-sdk' );
const Async = require( 'async' );
const getClient = require( './get-client' );
const getObjects = require( './get-objects' );
const settings = require( './config.json' );

const s3From = getClient( settings.source );
const s3To = getClient( settings.destination );

const putObject = ( key, data, callback ) => {
	console.log( 'putting ' + key );

	const params = {
		Bucket: settings.destination.bucket,
		Key: key,
		Body: data,
	};

	s3To.upload( params ).send( ( err, result ) => {
		console.log( result );
		callback( err, result );
	} );
};

const copyObject = ( obj, callback ) => {
	console.log( 'downloading: ' + obj.Key );
	const request = {
		Bucket: settings.source.bucket,
		Key: obj.Key,
	};

	const stream = s3From.getObject( request ).createReadStream();
	console.log( 'uploading: ' + obj.Key );
	putObject( obj.Key, stream, callback );
};

const handleObjects = ( err, data ) => {
	if ( err ) {
		throw new Error( err );
	}

	const tasks = data.map( d => ( cb ) => copyObject( d, cb ) );
	Async.series( tasks, ( err, data ) => {
		if ( err ) {
			throw err;
		}

		console.dir( data );
		console.log( 'complete' );
	} );
};

getObjects( s3From, settings.source.bucket, handleObjects );
