
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.join(process.cwd(), '.env') });

const envConfigs = {
    // dbUri: process.env.MONGODB_URI,
    port: process.env.BACKEND_PORT || 5000,
    jwtSecret: process.env.JWT_SECRET,

    // jwtSecret: process.env.JWT_SECRET,
    // redisUri: process.env.NODE_ENV ? process.env.REDIS_URL : process.env.REDIS_URL_LOCAL,
};
module.exports = envConfigs;