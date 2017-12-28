'use strict!'
const HTTP2Client = require('./http2Client.js');
const Notification = require('./notification.js');

/**
 * @const
 * @type {String}
 * @default
 * @desc Hosts i.e. server to connect
 */
const PRD_HOST = 'api.push.apple.com';
const DEV_HOST = 'api.development.push.apple.com';
/**
 * @const
 * @type {Number}
 * @default
 * @desc Port Number
 */
const PORT =  443;
/**
 * @const 
 * @type {Number}
 * @default
 * @desc API version
 */
const VERSION = 3;

class APNSHTTP2  {
    /**
     * @constructor 
     * @param {Object} options
     */
    constructor(options) {
        this.key = options.key;
        this.cert = options.cert;
        this.pfx = options.pfx;
        this.passphrase = options.passphrase;
        this.apns_topic = options.apns_topic;
        this.host = options.production ? PRD_HOST : DEV_HOST
        this.client = new HTTP2Client(options.host || this.host, options.port || PORT);
    }
    /**
     * @static
     * @return {Class} Notification
     */
    static Notification() {
        return Notification;
    }
    /**
     * @param {Array<Notification> | Notification} notifications
     * @return {Array<Promises> | Promise}
     */
    send(notifications) {
        if (!Array.isArray(notifications)) {
              return this._sendToApns(notifications);
            }

            var promises =  notifications.map((notification) => this._sendToApns(notification).catch((err) => err));
            return Promise.all(promises);
    }
    
    _sendToApns(notification) {
        if(!notification.deviceToken) return Promise.reject(new Error ("Device token missing"));
        const options = {};
        if (this.key) {
            options.key = this.key;
        }
        if (this.cert) {
            options.cert = this.cert;
        }
        if (this.pfx) {
            options.pfx = this.pfx;
        }
        if (this.passphrase) {
            options.passphrase = this.passphrase;
        }
        options.path = '/' + VERSION + '/device/'+notification.deviceToken;
        options.method = 'POST';
        options.headers = {};
        if (this.apns_topic) {
            options.headers['apns-topic'] = this.apns_topic; 
        }
        if (notification.priority) {
            options.headers['apns-priority'] = notification.priority;
        }
        if (notification.expiration != undefined) {
            options.headers['apns-expiration'] = notification.expiration;
        }
        return this.client.post(options, notification);
    }
}



module.exports = APNSHTTP2;