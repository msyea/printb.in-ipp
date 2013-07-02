
module.exports = function(ippReq) {
    return {
        statusCode: 'successful-ok',
        id: ippReq.id,
        'operation-attributes-tag': {
            'attributes-charset': 'utf-8',
            'attributes-natural-language': 'en'
        },
        'printer-attributes-tag': {
            'charset-configured': 'utf-8',
            'charset-supported': 'utf-8',
            'compression-supported': 'none',
            'document-format-default': 'text/plain',
            'document-format-supported': ['text/plain', 'text/html'],
            'generated-natural-language-supported': 'en',
            'ipp-versions-supported': '1.0',
            'natural-language-configured': 'en',
            'operations-supported': ['Get-Printer-Attributes'],
            'pdl-override-supported': 'not-attempted',
            'printer-is-accepting-jobs': false,
            'printer-name': 'printb.in',
            'printer-state': 'idle',
            'printer-state-reasons': 'none',
            'printer-up-time': 60,
            'printer-uri-supported': 'ipp://localhost:3000',
            'queued-job-count': 0,
            'uri-authentication-supported': 'none',
            'uri-security-supported': 'none'
        }
    };
};