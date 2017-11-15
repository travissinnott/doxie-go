'use strict';


const chai = require('chai');
const expect = chai.expect;

const Packet = require('./Packet.js');

const SAMPLE_MSEARCH = Buffer.from(
`M-SEARCH * HTTP/1.1
HOST: 239.255.255.250:1900
MAN: "ssdp:discover"
MX: 1
ST: urn:dial-multiscreen-org:service:dial:1
USER-AGENT: Google Chrome/61.0.3163.100 Windows

`)

describe('Packet', function(){
	describe('#parse', function(){
		it('should take a raw packet buffer and return tye type and headers', function(){
			let [type, headers] = Packet.parse(SAMPLE_MSEARCH)
			expect(type).to.equal('M-SEARCH * HTTP/1.1');
			expect(headers).to.include({
				'HOST': '239.255.255.250:1900',
				'MAN': '"ssdp:discover"',
				'MX': '1',
				'ST': 'urn:dial-multiscreen-org:service:dial:1'
			});
		});
	});
});
