const focusRouter = require("../modules/focus-session/focus.route");
const userRouter = require("../modules/users/users.route");
const express = require('express');

const router = express.Router();

const applicationRoutes = [
    {
        path: '/auth', controller: userRouter
    },
    {
        path: '/focus', controller: focusRouter
    }
];

applicationRoutes.forEach(route => {
    router.use(route.path, route.controller);
});

module.exports = router;