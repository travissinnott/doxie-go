# doxie-go

A framework for interacting with the Doxie Go Wifi scanner via HTTP/JSON API.

# Features

This module aims to cover 100% of the Doxie HTTP/JSON API.

* SSDP device passive discovery via NOTIFY
* SSDP device active discovery via M-SEARCH
* All scanner HTTP/JSON API calls as documented

## Status

* SSDP is partially implemented
* HTTP/JSON API is partially implemented

This project is a work-in-progress.  Please visit again when version 1.0.0 is released.

# Installing

Only tested (so far) on Linux with Node v8.9.1.

```
npm install doxie-go
```

Requires a Node v6.12 or better.


# Basic Usage

## Discovery Service

The DiscoveryService module listens for Doxie to announce itself on the network
and can search for Doxie using the Simple Service Discovery Protocol (SSDP)

```javascript
const doxie = require('doxie-go');
const service = new doxie.DiscoveryService();

service.on('scanner', function(scanner) {
	scanner.hello()
	.then(info => console.log(info))

	scanner.recent()
	.then(file => console.log(`Found recent scan ${file}`))
});

service.start()   // Start listening for NOTICE
service.search()  // Send M-SEARCH

setTimeout(function(){
	service.stop();  //Stop listening, gracefully close socket.
}, 10000);
```

## Scanner

The Scanner class represents a single Doxie on the network. The DiscoveryService
will instantiate a Scanner when one is found on the network.  You can also manually
create one by providing the base URL and authentication:

```javascript
const doxie = require('doxie-go')
const scanner = new doxie.Scanner('http://192.168.0.35:8080', 'username', 'secret');

scanner.hello()
.then(info => console.log(info));


scanner.recent()
.then(recent => {
	if (recent) {
		scanner.get(recent).then(data => {
			fs.writeFile('recent.jpg', data, (err) => {
				if (err) {
					console.log("Error saving recent scan!");
				} else {
					console.log("Recent scan saved to recent.jpg");
				}
			})
		})
	} else {
		console.log("No recent scan found.");
	}
})
```

# Testing

Using Mocha, chai, and nock for testing.

## Run tests

```
npm test
```


# Contributing

Please start by posting an [issue](https://github.com/travissinnott/doxie-go/issues).  There 
may already be a fix in the works that just needs to be merged in and released.  If not,
simply fork and submit a pull request.  Be sure to include test coverage of any new code.

## Roadmap

1. Test device discovery via NOTIFY
2. Implement device discovery via M-SEARCH
3. Complete Scanner HTTP/JSON API coverage
4. Extract SSDP features into separate module


# Reference

* [Doxie HTTP/JSON API](http://help.getdoxie.com/content/doxiego/05-advanced/03-wifi/04-api/Doxie-API-Developer-Guide.pdf)
* [UPnP Device Architecture 2.0](http://upnp.org/specs/arch/UPnP-arch-DeviceArchitecture-v2.0.pdf)
