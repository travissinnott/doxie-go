'use strict';

const log = require('../logger.js').child({module:'ssdp.Client'});
const dgram = require('dgram');
const EventEmitter = require('events');
const Packet = require('./Packet.js')
const Scanner = require('../Scanner.js')


class Client extends EventEmitter {
	constructor(){
		super();

		const server = this.server = dgram.createSocket({type:'udp4', reuseAddr: true});

		server.on('error', (err) => {
			log.error({err}, "SSDP Server encountered error!");
			server.close();
			this.emit('error', err);
		});

		server.on('message', (msg, rinfo) => {
			//log.trace({msg: msg.toString('utf8'), rinfo}, "Received new packet!")
			//console.log(msg.toString('utf8'));
			let packet = new Packet(msg, rinfo);
			console.log(packet);
			if (packet.TYPE.startsWith('NOTIFY')) {
				this.emit('notify', packet);
			}
		})

		server.on('listening', () => {
			server.addMembership('239.255.255.250');
			const address = server.address();
			console.log(`server listening ${address.address}:${address.port}`);
		});

	}

	start() {
		this.server.bind({ port:1900, exclusive:false });
	}

	stop() {
		return new Promise((resolve, reject) => {
			this.server.close(() => {
				resolve();
			})
		});
	}

	search(urn) {
		log.debug({urn}, 'Search() called. NOT IMPLEMENTED!')
	}
}

module.exports = {
	Client
}