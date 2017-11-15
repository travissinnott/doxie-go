/*
 * ssdp_capture.js
 * 
 * Captures SSDP messages and saves them for later examination and replay
 *
**/
'use strict';

const os = require('os');
const dgram = require('dgram');
const server = dgram.createSocket({type:'udp4', reuseAddr: true});
const fs = require('fs-extra');
const path = require('path');
const moment = require('moment');

//Where to save sample files
const DIR = path.resolve('ssdp_samples')

server.on('error', (err) => {
  console.log(`server error:\n${err.stack}`);
  server.close();
});

server.on('message', (msg, rinfo) => {
  console.log(`Message from ${rinfo.address}:${rinfo.port}\n`, msg.toString('utf8'));
  save(msg, rinfo);
});

server.on('listening', () => {
	server.addMembership('239.255.255.250');

	const address = server.address();
	console.log(`server listening ${address.address}:${address.port}`);
});


let captureFile;
new Promise((resolve, reject) => {
	fs.ensureDir(DIR, function(){
		resolve()
	});
}).then(() => {
	return new Promise((resolve, reject) => {
		fs.open(path.join(DIR, `${moment().format('YYYYMMDD-HHmmss')}.json`), 'a', 0o644, (err, fd) => {
			if (err) {
				reject(err)
			} else {
				captureFile = fd;
				resolve(fd);
			}
		});
	})
}).then((fd) => {
	server.bind({port:1900, exclusive:false});
});


const startTime = new Date().getTime();

function save(msg, rinfo) {
	let t = new Date().getTime() - startTime;
	//let filename = path.join(DIR, `${startTime}-${t.padStart(10, '0')}.json`);
	fs.write(captureFile, JSON.stringify({
		ts: t,
		rinfo,
		data: msg.toString('utf8')
	}) + "\n", function(err, written, string){
		if (err) {
			console.log("Error writing to file!", err);
		} else {
			console.log("Recorded %s bytes", written);
		}
	});
}