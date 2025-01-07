const express = require('express');
const { registerController, loginController, getUserController } = require('./users.controller');
const { hashPassword, validate } = require('./users.middleware');
const userRouter = express.Router();


userRouter.post('/register', validate('registerUsers'), hashPassword, registerController);
userRouter.post('/findByEmail', validate('login'), loginController);
userRouter.get('/getUser', getUserController);

module.exports = userRouter;