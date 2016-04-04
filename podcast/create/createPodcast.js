const fs = require( 'fs' );
const Handlebars = require( 'handlebars' );

module.exports.urlPrefix = '';

var dayLookup = [ 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
var monthLookup = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ];

function zeros( num, width ) {
	var res = num.toString();
	while (res.length < width) { res = '0' + res; }
	return res;
}

function pubDateFormat ( timeStamp ) {
	var date = new Date( timeStamp );
	var day = dayLookup[ date.getDay() ];
	var dayOfMonth = zeros( date.getDate(), 2 );
	var month = monthLookup[ date.getMonth() ];
	var year = date.getFullYear();
	var hour = zeros( date.getHours(), 2 );
	var min = zeros( date.getMinutes(), 2 );
	var sec = zeros( date.getSeconds(), 2 );
	return day + ', ' + dayOfMonth + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec + ' GMT';
}

var getItems = ( items ) => {
	var result = [];
	var iteration = 0;
	var startDate = Date.now() - 365 * 24 * 60 * 60 * 1000;
	items.forEach( ( i ) => {
		iteration = iteration + 48 * 60 * 60 * 1000;
		var parts = i.Key.split( '/' );
		var name = parts[ 2 ].split( '.' )[0];
		result.push({
			title: name,
			author: name,
			subtitle: name,
			summary: name,
			url: module.exports.urlPrefix + i.Key,
			length: i.Size,
			type: 'audio/mp3',
			guid: module.exports.urlPrefix + i.Key,
			date: pubDateFormat(startDate + iteration ),
			//duration: '1:00:00',
		} );
	} );

	return result;
};

module.exports = ( items ) => {
	const content = fs.readFileSync( './feed.xml.template' ).toString();
	const template = Handlebars.compile( content );

	var parts = items[ 0 ].Key.split( '/' );
	var folder = parts[ 1 ];
	var link = '';

	var data = {
		title: folder,
		link: link,
		copyright: '',
		subtitle: folder,
		author: '',
		summary: folder,
		description: folder,
		email: '',
		categories: [
			{
				category: 'Technology'
			},
		],
		items: getItems( items ),
	};

	return template( data );
};
