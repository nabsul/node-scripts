const Async = require( 'async' );
const getClient = require( './get-client' );
const getObjects = require( './get-objects' );
const settings = require( './config.json' );

const s3From = getClient( settings.source );
const s3To = getClient( settings.destination );

const putObject = ( key, data, callback ) => {
	const params = {
		Bucket: settings.destination.bucket,
		Key: key,
		Body: data,
	};

	s3To.upload( params ).send( ( err, result ) => {
		console.log( 'Complete: ' + key );
		callback( err, result );
	} );
};

const copyObject = ( obj, callback ) => {
	console.log( 'Copying: ' + obj.Key );
	const request = {
		Bucket: settings.source.bucket,
		Key: obj.Key,
	};

	const stream = s3From.getObject( request ).createReadStream();
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

		console.log( 'all complete.' );
		console.dir( data );
	} );
};

getObjects( s3From, settings.source.bucket, handleObjects );
