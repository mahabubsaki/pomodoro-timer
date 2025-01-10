const express = require('express');
const { focusCreateController, getSpecificFocusSession, getStreakController, getCompletedSessionController, getDailyFocusSession, getAchivementsController } = require('./focus.controller');
const focusRouter = express.Router();

focusRouter.post('/create', focusCreateController);
focusRouter.get('/get/:id', getSpecificFocusSession);
focusRouter.get('/streak/:id', getStreakController);
focusRouter.get('/completed/:id', getCompletedSessionController);
focusRouter.get('/daily/:id', getDailyFocusSession);
focusRouter.get('/achievements/:id', getAchivementsController);

module.exports = focusRouter;