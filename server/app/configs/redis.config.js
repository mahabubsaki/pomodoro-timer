const { createClient } = require("redis");
const envConfigs = require("./env.config");






const redisClient = createClient({
    url: envConfigs.redisUrl,

});




redisClient.on('error', (err) => {
    console.log('Redis Err', err);
});

redisClient.on('connect', () => {
    console.log('Redis Connected');
});


module.exports = redisClient;