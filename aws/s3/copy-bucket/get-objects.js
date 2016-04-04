const flatten = require( 'lodash/flatten' );

module.exports = ( client, bucket, callback ) => {
	const listRequest = {
		Bucket: bucket,
	};

	const results = [];

	const getObjects = (err, data, callback) => {
		if (err){
			return callback(err);
		}

		results.push( data );

		if ( data.IsTruncated ) {
			const marker = data.Contents[ data.Contents.length - 1 ].Key;
			const req = Object.assign( { Marker: marker }, listRequest );
			return s3From.listObjects( req, ( err, data ) => getObjects( err, data, callback ) );
		}

		callback( null, results );
	};

	const cb = ( err, data ) => {
		if ( err ) return callback( err );
		callback( null, flatten( data.map( r => r.Contents ) ) );
	};

	client.listObjects( listRequest, ( err, data ) => getObjects( err, data, cb ) );
};
