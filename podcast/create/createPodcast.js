'use strict';
const xml2js = require( 'xml2js' );
const template = require( './feed' );

const dayLookup = [ 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat' ];
const monthLookup = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ];

const zeros = ( num, width ) => {
	var res = num.toString();
	while (res.length < width) { res = '0' + res; }
	return res;
};

const pubDateFormat = ( timeStamp ) => {
	var date = new Date( timeStamp );
	var day = dayLookup[ date.getDay() ];
	var dayOfMonth = zeros( date.getDate(), 2 );
	var month = monthLookup[ date.getMonth() ];
	var year = date.getFullYear();
	var hour = zeros( date.getHours(), 2 );
	var min = zeros( date.getMinutes(), 2 );
	var sec = zeros( date.getSeconds(), 2 );
	return day + ', ' + dayOfMonth + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec + ' GMT';
};

const getItems = ( items ) => {
	let iteration = 0;
	const startDate = Date.now() - 365 * 24 * 60 * 60 * 1000;
	return items.map( item => {
		iteration = iteration + 48 * 60 * 60 * 1000;
		var name = item.split( '.' )[0];
		return {
			title: name,
			author: name,
			subtitle: name,
			summary: name,
			url: 'http://' + item,
			length: 1,
			type: 'audio/mp3',
			guid: module.exports.urlPrefix + item.Key,
			date: pubDateFormat(startDate + iteration ),
			//duration: '1:00:00',
		};
	} );
};

module.exports = ( items, config ) => {
	var data = {
		title: config.title,
		link: config.link,
		copyright: config.author,
		subtitle: config.title,
		author: config.author,
		summary: config.title,
		description: config.title,
		email: config.email,
		categories: [
			{
				category: 'Technology'
			},
		],
		items: getItems( items ),
	};


	const xml = template( data );
	const builder = new xml2js.Builder();
	return builder.buildObject( xml );
};
