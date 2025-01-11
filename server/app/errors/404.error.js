const logger = require("../configs/pino.config");



const notFoundErrorHandler = (req, res) => {
    console.log(req.originalUrl);

    logger.error({
        msg: "Route not found",
        meta: {
            route: req.originalUrl,
            method: req.method,
        },
    });

    if (!res.headersSent) {
        res.status(404).json({
            statusCode: 404,
            message: "This route does not exist!",
            error: "Not Found",
            success: false,
        });
    }
};
module.exports = notFoundErrorHandler;