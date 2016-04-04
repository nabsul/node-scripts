var categories = ( cats ) => {
	return cats.map( ( c ) => {
		return { $: { text: '' } };
	} );
};

var items = ( items ) => {
	return items.map( ( i ) => {
		return {
			title: '',
			'itunes:author': '',
			'itunes:subtitle': '',
			'itunes:summary': '',
			'itunes:image': {
				$: { href: '' },
			},
			enclosure: {
				$: {
					url: '',
					length: '',
					type: '',
				}
			},
			guid: '',
			pubDate: '',
			'itunes:duration': '',
		};
	} );
};

module.exports = ( feed ) => {
	return {
		rss: {
			$: {
				'xmlns:itunes': 'http://www.itunes.com/dtds/podcast-1.0.dtd',
				version: '2.0',
			},
			channel: {
				title: feed.title,
				link: feed.link,
				language: feed.language ? feed.language : 'en-us',
				copyright: feed.copyright,
				'itunes:subtitle': '',
				'itunes:author': '',
				'itunes:summary': '',
				'description': '',
				'itunes:owner':{
					'itunes:name': '',
					'itunes:email': '',
				},
				'itunes:image': {
					$: { href: '' },
				},
				'itunes:explicit': 'no',
				'itunes:category': categories( feed.categories ),
				item: items( feed.items ),
			}
		}
	};
};