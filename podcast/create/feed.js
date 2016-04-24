const categories = ( cats ) => {
	return cats.map( ( c ) => {
		return { $: { text: c } };
	} );
};

const items = ( items ) => {
	return items.map( item => {
		return {
			title: item.title,
			'itunes:author': item.author,
			'itunes:subtitle': item.subtitle,
			'itunes:summary': item.summary,
			'itunes:image': {
				$: { href: item.url },
			},
			enclosure: {
				$: {
					url: item.url,
					length: item.length,
					type: item.type,
				}
			},
			guid: item.url,
			pubDate: item.date,
			'itunes:duration': 1,
		};
	} );
};

module.exports = ( feed ) => {
	return {
		rss: {
			$: {
				'xmlns:itunes': 'http://www.itunes.com/dtds/podcast-1.0.dtd',
				'xmlns:atom': 'http://www.w3.org/2005/Atom',
				version: '2.0',
			},
			channel: {
				'atom:link': {
					$: {
						href: feed.link,
						rel: 'self',
						type: 'application/rss+xml',
					}
				},
				title: feed.title,
				link: feed.link,
				language: feed.language ? feed.language : 'en-us',
				copyright: feed.copyright,
				'itunes:subtitle': feed.subtitle,
				'itunes:author': feed.author,
				'itunes:summary': feed.summary,
				'description': feed.description,
				'itunes:owner':{
					'itunes:name': feed.author,
					'itunes:email': feed.email,
				},
				'itunes:image': {
					$: { href: feed.link },
				},
				'itunes:explicit': 'no',
				'itunes:category': categories( feed.categories ),
				item: items( feed.items ),
			}
		}
	};
};