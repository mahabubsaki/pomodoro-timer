

const express = require('express');
const cors = require('cors');
const globalErrorHandler = require('./errors/global.error');
const notFoundErrorHandler = require('./errors/404.error');
const router = require('./routes');
const { DateTime } = require('luxon');

const app = express();



//middleare and parser
app.use(cors());

app.use(express.json());


//Application routes
app.use("/api/v1", router);


//testing route
app.get('/', (_, res) => {

    res.send({ status: true, message: 'server runinng perfectly' });
});



//ERRORS HANDLERS


//global error handler should be always under the application route
app.use(globalErrorHandler);

//not found error handler
app.use(notFoundErrorHandler);


module.exports = app;