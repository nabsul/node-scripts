module.exports = ( client, bucket, key, callback ) => {
	client.getObject( {
		Bucket: bucket,
		Key: key,
	}, callback );
};