const express = require('express');
require('express-async-errors');
const { userRouter, loginRouter } = require('./router');
const errorHandlerMiddleware = require('./middlewares/errorHandlerMiddleware');

const app = express();

app.use(express.json());

app.use('/login', loginRouter);
app.use('/user', userRouter);

app.use(errorHandlerMiddleware);

module.exports = app;
