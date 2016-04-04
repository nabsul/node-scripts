const AWS = require( 'aws-sdk' );

module.exports = ( settings ) => new AWS.S3( {
	apiVersion: '2006-03-01',
	accessKeyId: settings.id,
	secretAccessKey: settings.key,
	region: settings.region,
	httpOptions: {
		timeout: 45 * 60 * 1000,
	},
} );
