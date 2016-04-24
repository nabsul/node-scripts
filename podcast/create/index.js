const create = require( './createPodcast' );
const feedParams = require( './config.json' );
const fs = require( 'fs' );

const files = fs.readdirSync( feedParams.path );

const content = create( files, feedParams );

console.log( content );
