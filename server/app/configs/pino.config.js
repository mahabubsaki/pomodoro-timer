const pino = require('pino');
const db = require('./db.config');



const prismaTransport = {
    write: async (log) => {
        try {
            const logObject = JSON.parse(log);
            await db.logTrack.create({
                data: {

                    level: logObject.level.toString(),
                    message: logObject.msg || 'No message provided',
                    meta: logObject.meta || {},

                }
            });
        } catch (error) {
            console.error('Error saving log to PostgreSQL:', error);
        }
    }
};


const logger = pino(
    { level: 'info' },
    prismaTransport
);

module.exports = logger;