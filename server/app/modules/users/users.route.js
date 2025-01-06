const express = require('express');
const { registerController } = require('./users.controller');
const userRouter = express.Router();

userRouter.get('/', (_, res) => {
    res.send({ status: true, message: 'user route' });
});
userRouter.post('/register', registerController);

module.exports = userRouter;