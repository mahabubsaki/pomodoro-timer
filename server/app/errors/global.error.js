const httpStatus = require('http-status');
const handleCustomErrors = require('./funcs/handleCustomErrors');
const logger = require('../configs/pino.config');


const globalErrorHandler = (err, _, res, __) => {
    ;
    const responseObj = {
        statusCode: res.statusCode || 500,
        message: httpStatus[res.statusCode || '500'],
        error: err.message,
        success: false,
    };
    console.log(err, 'in global error handler');
    console.log(err?.name, 'name of error');
    if (err?.name === 'CustomError') {
        const { error, statusCode } = handleCustomErrors(err);
        responseObj.error = error;
        responseObj.statusCode = statusCode;
        responseObj.message = httpStatus[statusCode];
    }
    // console.log(responseObj, 'responseObj');
    logger.error({
        msg: 'Error in global error handler',
        meta: responseObj
    });
    return res.status(responseObj.statusCode).json(responseObj);

};
module.exports = globalErrorHandler;