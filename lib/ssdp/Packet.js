'use strict';

const log = require('../logger.js');
const ENCODING = 'utf8';

function parseBuffer(msg) {
	let at = 0;
	let eol= msg.indexOf('\n', at, ENCODING);
	let type = msg.toString(ENCODING, at, eol).trim();
	let headers = {};

	//console.log(`type: ${type}`);
	//console.log(`at: ${at} eol: ${eol}`);

	while (at < msg.length) {
		at = ++eol;
		eol = msg.indexOf('\n', at, ENCODING);

		//console.log(`at: ${at} eol: ${eol}`);

		if (eol == -1 || eol == at) break;

		let line = msg.toString(ENCODING, at, eol).trim();
		if ("" === line) break;
		
		let original, name, value;
		try {
			[original, name, value] = line.match(/^([^:]+)\s*:\s*(.+)/);
			headers[name] = value;
		} catch (err) {
			log.error({line, err, at, eol}, `Error matching! [${line}]`);
		}
		
		at++;
	}

	return [type, headers];
}

class Packet {
	constructor(type, headers) {
		this.TYPE = type
		this.HEADERS = headers
	}

	static parse(msg) {
		let [type, headers] = parseBuffer(msg)
		return new Packet(type, headers)
	}
}

module.exports = Packet;