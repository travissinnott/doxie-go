'use strict';

const doxie = require('../');
const log = doxie.log;

doxie.log.addStream({
	name: 'console',
	stream: process.stdout,
	level: 'trace'
});

const service = new doxie.DiscoveryService();

service.on('scanner', function(scanner) {
	console.log("Scanner event!")
});

log.info("started.")

service.search()
