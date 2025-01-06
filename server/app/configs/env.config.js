
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.join(process.cwd(), '.env') });

const envConfigs = {
    // dbUri: process.env.MONGODB_URI,
    port: process.env.BACKEND_PORT || 5000,
    pgHost: process.env.PG_HOST_DEV,
    pgUser: process.env.PG_USER_DEV,
    pgPort: process.env.PG_PORT_DEV,
    pgDatabase: process.env.PG_DATABASE_DEV,
    pgPassword: process.env.PG_PASSWORD_DEV,

    // jwtSecret: process.env.JWT_SECRET,
    // redisUri: process.env.NODE_ENV ? process.env.REDIS_URL : process.env.REDIS_URL_LOCAL,
};
module.exports = envConfigs;