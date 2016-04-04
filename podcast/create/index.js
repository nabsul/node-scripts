const create = require( './createPodcast' );
var feedParams = require( './config.json' );

const content = create( dir, feedParams );

