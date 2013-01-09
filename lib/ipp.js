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