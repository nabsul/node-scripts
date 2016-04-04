var podcast = require( 'podcast' );

module.exports = ( blobs ) => {
	var lookup = {};
	var result = [];

	blobs.forEach( ( i ) => {
		var parts = i.Key.split( '/' );
		var dir = parts[ 1 ];
		if (parts.length != 3 || parts[ 2 ] == '') {
			return;
		}


		if ( ! lookup[ dir ] ) {
			result.push( lookup[ dir ] = [] );
		}

		lookup[ dir ].push( i );
	});

	return result;
};
