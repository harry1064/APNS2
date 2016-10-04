"use strict!"

class Notification {
	/**
	 * @constructor 
	 * @param {String} deviceToken
	 * @param {Object} options
	 */
	constructor (deviceToken, options) {
		this.deviceToken = deviceToken;
		this.aps = options.aps;
		this.alert = options.alert;
		this.customData = options.customData;
		this.priority = options.priority;
		this.expiration = options.expiration;
	}
	/**
	 * @return {Object} Json format payload to send to apple push notification server.
	 */
	getFormatedPayLoad () {
		const payLoad = {};
		payLoad['aps'] = this.aps;
		payLoad['aps']['alert'] = this.alert;
		for (const key in this.customData) {
			payLoad[key] = this.customData[key];
		}
		return payLoad;
	}
}

module.exports = Notification;