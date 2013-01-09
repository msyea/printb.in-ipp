var express = require('express');
var app = express();

var request = require('./lib/request'),
    response = require('./lib/response');

app.all('/', function (req, res) {
    res.type('application/ipp');
    console.log('new request: ' + req.method);
    if (req.get('content-length')) {
        var buf = new Buffer(req.get('content-length'));
        var len = 0;
        req.on('data', function(chunk) {
            console.log('****CHUNK****');
            console.log(chunk[0]+'.'+chunk[1]);
            console.log(chunk.readInt16BE(2, true));
            console.log(chunk.readInt16BE(3, true));
            console.log(chunk.readInt16BE(4, true));
            chunk.copy(buf, len);
            len += chunk.length;
        });
        req.on('end', function() {
            console.log('****BUF****');
            console.log(buf.toString());
            console.log('send: 200');
            res.send(200);
        });
    }
    if ('100-continue' === req.get('expect')) {
        console.log('send: 100');
        res.send(100);
    }
});




if (!module.parent) {
    var port = process.env.PORT || 3000;
    var host = process.env.HOST || '0.0.0.0';
    app.listen(port, host);
    console.log(
        'Compound server listening on %s:%d within %s environment',
        host, port, app.settings.env);
}

/**
Print-Job
Validate-Job
Print-URI
Create-Job
Get-Printer-Attributes
Get-Jobs
All Operations
**/

var TAGS = {
    delimiter: {
        // 'reserved': 0x00,
        'operation-attributes-tag': 0x01,
        'job-attributes-tag': 0x02,
        'end-of-attributes-tag': 0x03,
        'printer-attributes-tag': 0x04,
        'unsupported-attributes-tag': 0x05,
        'chunking-end-of-attributes-tag': 0x0F //  reserved for future chunking-end-of-attributes-tag
        // 0x06-0x0e reserved for future delimiters
    },
    value: {
        'unsupported': 0x10,
        'default': 0x11, // reserved for future 'default'
        'unknown': 0x12,
        'no-value': 0x13,
        // 0x14-0x1F reserved for future "out-of-band" values
        // 'reserved': 0x20,
        'integer': 0x21,
        'boolean': 0x22,
        'enum': 0x23,
        // 0x24-0x2F reserved for future integer types
        'octetString': 0x30,  // with an  unspecified format
        'dateTime': 0x31,
        'resolution': 0x32,
        'rangeOfInteger': 0x33,
        'collection': 0x34,  // reserved for collection (in the future)
        'textWithLanguage': 0x35,
        'nameWithLanguage': 0x36,
        // 0x37-0x3F reserved for future octetString types
        // 'reserved': 0x40,
        'textWithoutLanguage': 0x41,
        'nameWithoutLanguage': 0x42,
        // 'reserved': 0x43,
        'keyword': 0x44,
        'uri': 0x45,
        'uriScheme': 0x46,
        'charset': 0x47,
        'naturalLanguage': 0x48,
        'mimeMediaType': 0x49 ,
        // 0x4A-0x5F reserved for future character string types
    }
}







