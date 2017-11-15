
# SSDP Notes

Doxie uses UPnP SSDP to announce itself to the network, and supposedly responds to M-SEARCH requests.

I had trouble with the [node-sspd](https://www.npmjs.com/package/node-ssdp) module and began a 
simple SSDP implementation within this projectwith the intention of extracting it into it's own module.

This document tracks SSDP implementation with regard to working with Doxie.  Likewise the SSDP 
implementation in this project is limited to the set of features required to discover Doxie.


## References

* [UPnP Device Architecture 2.0 Specification](http://upnp.org/specs/arch/UPnP-arch-DeviceArchitecture-v2.0.pdf)



# Sample Messages

Here's a few things Doxie does when connecting to a Wifi network:


## Scanner NOTIFY 1

```
NOTIFY * HTTP/1.1
Host: 239.255.255.250:1900
Cache-Control: max-age=120
Location: http://10.7.1.83:8080/doxie/document
NT: uuid:8FF85020-F1C4-4052-945C-D681CBBADEDD
NTS: ssdp:alive
Server: Linux/2.6.36 UPnP/1.0 DoxieDX250/1.0
USN: uuid:8FF85020-F1C4-4052-945C-D681CBBADEDD
Application-URL: http://10.7.1.83:8080/scans/
```

## Scanner NOTIFY 2

```
NOTIFY * HTTP/1.1
Host: 239.255.255.250:1900
Cache-Control: max-age=120
Location: http://10.7.1.83:8080/doxie/document
NT: upnp:rootdevice
NTS: ssdp:alive
Server: Linux/2.6.36 UPnP/1.0 DoxieDX250/1.0
USN: uuid:8FF85020-F1C4-4052-945C-D681CBBADEDD::upnp:rootdevice
Application-URL: http://10.7.1.83:8080/scans/
```

## Scanner NOTIFY 3

```
NOTIFY * HTTP/1.1
Host: 239.255.255.250:1900
Cache-Control: max-age=120
Location: http://10.7.1.83:8080/doxie/document
NT: urn:schemas-getdoxie-com:device:Scanner:1
NTS: ssdp:alive
Server: Linux/2.6.36 UPnP/1.0 DoxieDX250/1.0
USN: uuid:8FF85020-F1C4-4052-945C-D681CBBADEDD::urn:schemas-getdoxie-com:device:Scanner:1
Application-URL: http://10.7.1.83:8080/scans/
```

## Doxie Application M-SEARCH

```
M-SEARCH * HTTP/1.1
HOST: 239.255.255.250:1900
MAN: "ssdp:discover"
MX: 1
ST: urn:schemas-getdoxie-com:device:Scanner:1
```

## Scanner UPnP schema

curl http://scanner:8080/doxie/document

```xml
<?xml version="1.0" encoding="UTF-8"?>
<root xmlns="urn:schemas-upnp-org:device-1-0">
	<specVersion>
		<major>1</major>
		<minor>0</minor>
	</specVersion>
	<device>
		<deviceType>urn:schemas-getdoxie-com:device:Scanner:1</deviceType>
		<friendlyName>Doxie_068D02</friendlyName>
		<manufacturer>Apparent</manufacturer>
		<modelName>DoxieDX250</modelName>
		<modelNumber>1.0</modelNumber>
		<presentationURL>http://10.7.1.83:8080/scans/</presentationURL>
		<UDN>uuid:8FF85020-F1C4-4052-945C-D681CBBADEDD</UDN>
		<serviceList>
			<service>
				<serviceType>urn:schemas-getdoxie-com:service:NullService:1</serviceType>
				<serviceId>urn:getdoxie-com:serviceId:NullService</serviceId>
				<SCPDURL />
				<controlURL />
				<eventSubURL />
			</service>
		</serviceList>
	</device>
</root>
```



