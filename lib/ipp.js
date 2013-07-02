var express = require('express');
var app = express();

var ipp = require('ipp');

app.disable('x-powered-by');

app.all('/', function (req, res) {
    var session = {};
    if (req.get('content-length')) {
        var reqBuf = new Buffer(parseInt(req.get('content-length'), 10)),
            len = 0;
        req.on('data', function(chunk) {
            chunk.copy(reqBuf, len);
            len += chunk.length;
        });
        req.on('end', function() {
            var ippReq = ipp.parse(reqBuf),
                ippRes;

            console.log('Request: ');
            console.log(ippReq);

            switch (ippReq.operation) {
                case 'Get-Printer-Attributes':
                    ippRes = require('./operations/get-printer-attributes')(ippReq, session);
                    break;
                case 'Get-Jobs':
                    ippRes = require('./operations/get-jobs')(ippReq, session);
                    break;
                default:
                    ippRes = require('./operations/error');
            }

            ippRes.version = ippReq.version;

            console.log('Response: ');
            console.log(ippRes);

            res.type('application/ipp');
            res.send(200, ipp.serialize(ippRes));
        });
    } else {
        res.send(500);
    }
    if ('100-continue' === req.get('expect')) {
        console.log('Send 100');
        // res.send(100);
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