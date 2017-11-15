'use strict';

const Scanner = require('./Scanner.js');
const chai = require('chai');
const expect = chai.expect;
const nock = require('nock');

const SCANNER_BASE_URL = 'http://scanner:8080';
const SCANNER_HELLO_RESP_CLIENT = {
	"model": "DX250",
	"name": "Doxie_042D6A",
	"firmwareWiFi": "1.29",
	"hasPassword": false,
	"MAC": "00:11:E5:04:2D:6A",
	"mode": "Client",
	"network": "Apparent",
	"ip": "10.0.0.100"
}

const SCANNER_HELLO_EXTRA_RESP = {
	"firmware": "0.26",
	"connectedToExternalPower": true
}

//TODO: Test for when Doxie requires Authentication

describe('Scanner', function(){
	let scanner;

	before(function(){
		scanner = new Scanner(SCANNER_BASE_URL);
	});

	describe('#hello()', function(){
		beforeEach(function() {
			nock(SCANNER_BASE_URL)
			.get('/hello.json')
			.reply(200, SCANNER_HELLO_RESP_CLIENT);
		});

		it('returns a hello response', function(){
			return scanner.hello().then(res => {
				expect(res).to.include(SCANNER_HELLO_RESP_CLIENT);
			})
		})
	});

	describe('#helloExtra()', function(){
		beforeEach(function() {
			nock(SCANNER_BASE_URL)
			.get('/hello_extra.json')
			.reply(200, SCANNER_HELLO_EXTRA_RESP);
		});

		it('returns a hello_extra response', function(){
			return scanner.helloExtra().then(res => {
				expect(res).to.include(SCANNER_HELLO_EXTRA_RESP);
			});
		})
	});

	describe('#restart()', function(){
		it('should restart the scanner');
	});

	describe('#scans()', function(){
		it('returns an array of scans');
	});

	describe('#recent()', function(){
		it('returns the path to the most recent scan');
	});

	describe('#get()', function(){
		it('returns a JPG');
	})

	describe('#thumbnail()', function(){
		it('returns a thumbnail JPG');
	});

	describe('#delete()', function(){
		it('deletes a single image from the scanner');
		it('deletes multiple images from the scanner');
	})
});


