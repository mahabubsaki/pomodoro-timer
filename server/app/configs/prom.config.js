const promClient = require('prom-client');
const register = new promClient.Registry();

promClient.collectDefaultMetrics({ register });


const httpRequestDurationMicroseconds = new promClient.Histogram({
    name: 'http_request_duration_seconds',
    help: 'Duration of HTTP requests in seconds',
    labelNames: ['method', 'route', 'status_code'],
});
register.registerMetric(httpRequestDurationMicroseconds);




module.exports = { register, httpRequestDurationMicroseconds };