var parser = require('./parser');

module.exports = function (reqBuf) {
	req = parser(reqBuf);
	
	return req;
};