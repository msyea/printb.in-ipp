var CONSTS = require('../consts');

module.exports = function(request) {
    console.log(request);
    var x = {
        reqid: request.reqId,
        status: CONSTS.STATUS.OK,
        attributes: {
            'device-class': 'network',
            'device-id': [
                'MFG:makopass;',
                'CMD:POSTSCRIPT,POSTSCRIPT2;',
                'MDL:Print Server;'
            ].join('\n'),
            'device-info': 'makopass print server',
            'device-make-and-model': 'unknown',
            'device-uri': 'ipp://localhost:3000'
        }
      };
   //    'requested-attributes': 
   // [ 'device-uri',
   //   'printer-info',
   //   'printer-is-accepting-jobs',
   //   'printer-make-and-model',
   //   'printer-more-info' ] }

    var response = new Buffer(9);
    response.writeInt8(request.versionMajor, 0);
    response.writeInt8(request.versionMinor, 1);
    response.writeInt16BE(CONSTS.STATUS.OK, 2); // status-code
    response.writeInt32BE(request.reqId, 4); // request-id
    response.writeInt8(CONSTS.TAG.END, 8); // end-of-attributes-tag


    return response;
    
    var response = new Buffer(169);
    response.writeInt16BE(0x0101, 0); // 1.1 version-number
    response.writeInt16BE(0x040B,2); // client-error-attributes-or-values-not-supported  status-code
    response.writeInt32BE(0x00000001, 4); // 1 request-id
    response.writeInt8(0x01, 8); // start operation-attributes tag
    response.writeInt8(0x47, 9); // charset type value-tag
    response.writeInt16BE(0x0012, 10); // name-length
    response.write('attributes-charset', 12);  // name
    response.writeInt16BE(0x0008, 30);  // value-length
    response.write('us-ascii', 32); // value
    response.writeInt8(0x48, 40); // value-tag
    response.writeInt16BE(0x001B, 41); // name-length
    response.write('attributes-natural-language', 43); // name
    response.writeInt16BE(0x0005, 68); // value-length
    response.write('en-US', 70); // value
    response.writeInt8(0x41, 75); // value-tag
    response.writeInt16BE(0x000E, 76); // name-length
    response.write('status-message', 78); //name
    response.writeInt16BE(0x002F, 92); // value-length
    response.write('client-error-attributes-or-values-not-supported', 94); // value
    response.writeInt8(0x05, 141); // start unsupported-attributes
    response.writeInt8(0x21, 142); // integer type value-tag
    response.writeInt16BE(0x0006, 143); // name-length
    response.write('copies', 145); // name
    response.writeInt16BE(0x0004, 151); // value-length
    response.writeInt32BE(0x00000014, 153); // 20 value
    response.writeInt8(0x10, 157); // unsupported (type) value-tag
    response.writeInt16BE(0x0005, 159); // name-length
    response.write('sides', 161); // name
    response.writeInt16BE(0x0000, 166); // value-length
    response.writeInt8(0x03, 168); // end-of-attributes-tag

    return response;
};