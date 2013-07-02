
module.exports = function(ippReq) {
    return {
        statusCode: 'successful-ok',
        id: ippReq.id,
        'operation-attributes-tag': {
            'attributes-charset': 'utf-8',
            'attributes-natural-language': 'en'
        }
    };
};