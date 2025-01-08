const express = require('express');
const { focusCreateController, getSpecificFocusSession } = require('./focus.controller');
const focusRouter = express.Router();

focusRouter.post('/create', focusCreateController);
focusRouter.get('/get/:id', getSpecificFocusSession);

module.exports = focusRouter;