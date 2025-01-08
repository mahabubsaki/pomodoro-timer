const db = require("../../configs/db.config");
const envConfigs = require("../../configs/env.config");
const catchAsync = require("../../errors/catch-async.error");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const registerController = catchAsync(async (req, res) => {
    const { name, email, password, avatarUrl } = req.body;
    const existingUser = await db.user.findUnique({
        where: {
            email
        }
    });
    if (existingUser) {
        return res.status(409).send({ status: false, message: 'User already exists' });
    }
    const user = await db.user.create({
        data: {
            name,
            email,
            password,
            avatarUrl
        },

    });


    res.send({ status: true, message: 'register controller', data: { user } });
});

const loginController = catchAsync(async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const user = await db.user.findUnique({
        where: {
            email
        }
    });
    if (!user) {
        return res.status(404).send({ status: false, message: 'user not found' });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
        return res.status(401).send({ status: false, message: 'password not correct' });
    }
    res.send({ status: true, message: 'login controller', data: user });

});

const getUserController = catchAsync(async (req, res) => {
    // console.log(req.query.email);
    const user = await db.user.findUnique({
        where: {
            email: req.query.email
        }
    });
    // console.log(user);
    res.send({ status: true, message: 'get user controller', data: user });
});

module.exports = {
    registerController, loginController, getUserController
};