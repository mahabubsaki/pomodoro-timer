const { httpRequestDurationMicroseconds } = require("../configs/prom.config");

const promSetup = (req, res, next) => {
    const end = httpRequestDurationMicroseconds.startTimer();
    res.on('finish', () => {
        end({ method: req.method, route: req.url, status_code: res.statusCode });
    });
    next();
};

module.exports = promSetup;