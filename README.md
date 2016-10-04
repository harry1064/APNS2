# APNS2

> To use this library, node must be v6 or higher.

### Create Client

Client using .p12 and passphrase
```javascript
const APNS = require('apns-http2');
const fs = require('fs');
const apnsClient = new APNS({
	pfx: fs.readFileSync('/path/to/Certificates.p12'),
    passphrase: 'test',
    apns_topic: 'com.yourapp.com'
});
```

Client using cert and key in .pem extension

```javascript
const APNS = require('apns-http2');
const fs = require('fs');
const apnsClient = new APNS({
	cert: fs.readFileSync('/path/to/Certificate.pem'),
    key: '/path/to/key.pem',
    apns_topic: 'com.yourapp.com'
});
```
### Sending Push Notification

```javascript
const Notification = APNS.Notification;

const aps = {
        badge : 9,
        sound : "bingbong.aiff"
    };
const alert = {
            title : "Game Request",
            body : "Bob wants to play poker"
        };
const deviceToken = '00fc13adff785122b4ad28809a3420982341241421348097878e577c991de8f0';
const options = {
	'aps' : aps,
	'alert' : alert,
	'priority' : 10,
	'expiration' : 0
}
const notification = new Notification(deviceToken, options);
apnsClient.send(notification)
.then((res) => {
	console.log("response  " + res);
}).catch((err) => {
	console.log('APNS ERROR: ' + err);
});
```
#### Payload Example can be found here [Notification JSON payload examples](https://developer.apple.com/library/content/documentation/NetworkingInternet/Conceptual/RemoteNotificationsPG/Chapters/TheNotificationPayload.html#//apple_ref/doc/uid/TP40008194-CH107-SW10)

#### For generating certificate [Apple guide to generate push certificate](https://developer.apple.com/library/content/documentation/IDEs/Conceptual/AppDistributionGuide/AddingCapabilities/AddingCapabilities.html#//apple_ref/doc/uid/TP40012582-CH26-SW11)
