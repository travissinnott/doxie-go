'use strict';

const log = require('./lib/logger.js');
log.addStream({
	name: 'console',
	stream: process.stdout,
	level: 'TRACE'
});

const ssdp = require('./lib/ssdp');

const client = new ssdp.Client();


client.start();