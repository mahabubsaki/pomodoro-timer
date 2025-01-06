const userRouter = require("../modules/users/users.route");
const express = require('express');

const router = express.Router();

const applicationRoutes = [
    {
        path: '/auth', controller: userRouter
    },
];

applicationRoutes.forEach(route => {
    router.use(route.path, route.controller);
});

module.exports = router;