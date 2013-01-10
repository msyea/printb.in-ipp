var express = require('express');
var app = express();

var request = require('./request'),
    response = require('./response');

app.all('/', function (req, res) {
    res.type('application/ipp');
    console.log('new request: ' + req.method);
    if (req.get('content-length')) {
        var reqBuf = new Buffer(parseInt(req.get('content-length'))),
            len = 0;
        req.on('data', function(chunk) {
            chunk.copy(reqBuf, len);
            len += chunk.length;
        });
        req.on('end', function() {
            var preq = request(reqBuf);
            console.log(preq);
            console.log(preq.groups.operation['requested-attributes']);
            var pres = response({
                reqid: preq.reqId,
                status: 'successful-ok',
                attributes: {
                    'op': require('./consts').OP.GET_PRINTER_ATTRIBUTES,
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
              });
            res.send(200, pres);
        });
    }
    if ('100-continue' === req.get('expect')) {
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