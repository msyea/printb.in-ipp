var express = require('express');
var app = express();

var request = require('./request'),
    response = require('./response');

app.all('/', function (req, res) {
    console.log(req.headers);
    res.type('application/ipp');
    console.log('new request: ' + req.method);
    if ('GET' === req.method) {
        console.log(req);
    }
    if (req.get('content-length')) {
        var reqBuf = new Buffer(parseInt(req.get('content-length'))),
            len = 0;
        req.on('data', function(chunk) {
            chunk.copy(reqBuf, len);
            len += chunk.length;
        });
        req.on('end', function() {
            var preq = request(reqBuf);
                operation = preq.operation,
                response;

            switch (operation) {
                case 'get-printer-attributes':
                    response = require('./operations/' + operation)(preq)

            }
            console.log(preq.operation);
            console.log(preq.groups.operation['requested-attributes']);

            var x = {
                reqid: preq.reqId,
                status: require('./consts').STATUS.OK,
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


            var resA = [];
            resA.push(reqBuf[0]); // version-number
            resA.push(require('./consts').STATUS.OK); // status-id
            resA.push(reqBuf.readInt32BE(4, true)); // request-id
            resA.push(require('./consts').STATUS.OK); // end-of-attributes-tag
            var resBuf = new Buffer(resA);
            console.log(resA.length);
            res.set('content-length', resA.length);
            console.log('Send 200: ' + resBuf.toString());
            res.send(200, resBuf);
        });
    }
    if ('100-continue' === req.get('expect')) {
        console.log('Send 100');
        //res.send(100);
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