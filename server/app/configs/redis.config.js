const { createClient } = require("redis");
const envConfigs = require("./env.config");
const logger = require("./pino.config");



console.log(envConfigs.redisUri);


const redisClient = createClient({
    url: envConfigs.redisUri,

});




redisClient.on('error', (err) => {
    logger.error({
        msg: 'Redis Error',
        meta: err,
    });
    console.log('Redis Err', err);
});

redisClient.on('connect', () => {
    console.log('Redis Connected');
});


module.exports = redisClient;