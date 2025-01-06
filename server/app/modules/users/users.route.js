const express = require('express');
const { registerController } = require('./users.controller');
const hashPassword = require('./users.middleware');
const userRouter = express.Router();

userRouter.get('/', (_, res) => {
    res.send({ status: true, message: 'user route' });
});
userRouter.post('/register', hashPassword, registerController);

module.exports = userRouter;