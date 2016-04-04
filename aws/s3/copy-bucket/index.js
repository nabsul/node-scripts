const Async = require( 'async' );
const getClient = require( './get-client' );
const getObjects = require( './get-objects' );
const settings = require( './config.json' );

const s3From = getClient( settings.source );
const s3To = getClient( settings.destination );

const putObject = ( key, data, callback ) => {
	console.log( 'putting ' + key );
	s3To.putObject( {
		Bucket: settings.destination.bucket,
		Key: key,
		Body: data,
	}, ( err ) => {
		if ( err ) {
			return callback( err );
		}

		console.log( 'success: ' + key );
		callback( null, 'success: ' + key );
	} ) ;
};

const copyObject = ( obj, callback ) => {
	console.log( 'downloading: ' + obj.Key );
	s3From.getObject( {
		Bucket: settings.source.bucket,
		Key: obj.Key,
	}, ( err, data ) => {
		if ( err ) {
			callback( err );
		}

		console.log( 'uploading: ' + obj.Key );
		putObject( obj.Key, data.Body, callback );
	} );
};

const handleObjects = ( err, data ) => {
	if ( err ) {
		throw new Error( err );
	}

	const tasks = data.map( d => ( cb ) => copyObject( d, cb ) );
	Async.parallelLimit( tasks, 2, ( err, data ) => {
		if ( err ) {
			throw err;
		}

		console.dir( data );
		console.log( 'complete' );
	} );
};

getObjects( s3From, settings.source.bucket, handleObjects );
