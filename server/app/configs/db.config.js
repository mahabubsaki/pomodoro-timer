


const { PrismaClient } = require('@prisma/client');

const db = new PrismaClient({
    log: ['query']
});


module.exports = db;