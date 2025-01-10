
const envConfigs = require('./configs/env.config');
const app = require('./app');
const db = require('./configs/db.config');
const redisClient = require('./configs/redis.config');



process.on("uncaughtException", (error) => {
    console.log(error, 'in server file');
    process.exit(1);
});
async function bootstrap() {

    try {

        app.listen(envConfigs.port, async () => {

            await db.$connect();
            await redisClient.connect();
            console.log(`Listening to ${envConfigs.port}`);
            console.log('Connected to db');
        });

    } catch (err) {
        console.log('failed to connect db in server file', err);
    }
    process.on('unhandledRejection', (error) => {
        console.log(error, 'in server file');
        process.exit(1);

    });
}
bootstrap();

process.on("SIGTERM", () => {
    console.log("Sigterm recieved");
    server.close(() => {
        process.exit(1);
    });
});