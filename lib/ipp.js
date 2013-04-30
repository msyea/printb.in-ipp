var express = require('express');
var app = express();

var request = require('./request'),
    response = require('./response');

app.disable('x-powered-by');

app.all('/', function (req, res) {
    res.type('application/ipp');
    console.log('new request: ' + req.method);
    if ('GET' === req.method) {
        console.log(req);
    }
    if (req.get('content-length')) {
        var reqBuf = new Buffer(parseInt(req.get('content-length'), 10)),
            len = 0;
        req.on('data', function(chunk) {
            chunk.copy(reqBuf, len);
            len += chunk.length;
        });
        req.on('end', function() {
            var preq = request(reqBuf),
                operation = preq.operation,
                pres;

            console.log('Operation: "' + operation + '"');
            switch (operation) {
                case 'get-printer-attributes':
                    pres = require('./operations/' + operation)(preq);
                    break;
                default:
                    console.log('Operation "' + operation + '" not recognisedare');
                    return;
            }
            res.set('content-length', pres.length);
            console.log('Send 200');
            res.send(200, pres);
        });
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