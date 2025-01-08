const express = require('express');
const { focusCreateController, getSpecificFocusSession, getStreakController } = require('./focus.controller');
const focusRouter = express.Router();

focusRouter.post('/create', focusCreateController);
focusRouter.get('/get/:id', getSpecificFocusSession);
focusRouter.get('/streak/:id', getStreakController);

module.exports = focusRouter;