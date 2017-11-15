'use strict';

const log = require('./logger.js').child({module:'DiscoveryService'});
const Scanner = require('./Scanner.js');
const EventEmitter = require('events');
const SsdpClient = require('./ssdp').Client;

class DiscoveryService extends EventEmitter {
	constructor() {
		super();
		let client = this.client = new SsdpClient();

		this.client.on('notify', (...args) => {
			log.trace(args, 'notify event!');
			if ('urn:schemas-getdoxie-com:device:Scanner:1' === packet.HEADERS.NT) {
				this.emit('scanner', new Scanner(packet.HEADERS['Application-URL']));
			}
		})
		this.start();
	}

	start() {
		log.debug('Starting Doxie DiscoveryService')
		this.client.start();
	}

	stop() {
		this.client.stop();
	}
	
	search() {
		log.trace("searching....");
		this.client.search('urn:schemas-getdoxie-com:device:Scanner:1');
	}
}

module.exports = DiscoveryService;
