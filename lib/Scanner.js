'use strict';

const log = require('./logger.js');
const request = require('request');
const rp = require('request-promise-native');

class Scanner {
	constructor(url, user, pass) {
		let DEFAULTS = {
			baseUrl: url,
			method: 'GET',
			json: true,
			headers: {
				'User-Agent': 'doxie-go@1.0.0'
			}
		}
		if (user && pass) {
			defaults.auth = { user, pass };
		}
		this.request = rp.defaults(DEFAULTS);
	}

	hello() {
		return this.request('/hello.json')
	}

	helloExtra() {
		return this.request('/hello_extra.json')
	}



}

module.exports = Scanner;