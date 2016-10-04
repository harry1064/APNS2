'use strict!'
/*
* importing http2 module
*/
const http2 = require('http2');

class HTTP2Client {
	/**
	 *@constructor
	 *  @param {String} host
 	 * @param {Number} port
	 */
	constructor (host, port) {
		this.host = host;
		this.port = port;
	}
	/**
	 * @param {Object} options
	 * @param {Notification} notification
	 * @return {Promise} 
	 * @desc This method makes the final post request to server and return Promise.
	 */
	post(options,notification) {
		if (!options) return Promise.reject(new Error ('options can not be empty'));
		options.method = 'POST';
		options.host = this.host;
		options.port = this.port;
		var body = notification.getFormatedPayLoad();
		return new Promise ((resolve, reject) => {
				const req = http2.request(options, res => {
				const data = [];
				res.on('data', (chunks) => {
					data.push(chunks.toString('utf8'));
				});
				res.on('end', () => {
					res.body = data.join('');
					var result = {};
					result.status = res.statusCode;
					if (res.body != '') {
						result.body = res.body;
					};
					resolve(result);
				})
			});
			req.on('error', (err) => {
				reject(err);
			});
			if (body) {
				req.write(JSON.stringify(body));
			}
			req.end();
			
		});
	}
}

module.exports = HTTP2Client;