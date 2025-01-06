const catchAsync = require("../../errors/catch-async.error");

const registerController = catchAsync(async (req, res) => {
    console.log(req.body, 'register controller');
    res.send({ status: true, message: 'register controller' });
});

module.exports = {
    registerController
};