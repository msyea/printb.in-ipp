
module.exports = function(ippReq) {
    return {
        statusCode: 'server-error-internal-error',
        id: ippReq.id
    };
};