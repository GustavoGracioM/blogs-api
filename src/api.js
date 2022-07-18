const express = require('express');
require('express-async-errors');
const { userRouter, loginRouter, categoryRouter, postRouter } = require('./router');
const errorHandlerMiddleware = require('./middlewares/errorHandlerMiddleware');

const app = express();

app.use(express.json());

app.use('/login', loginRouter);
app.use('/user', userRouter);
app.use('/categories', categoryRouter);
app.use('/post', postRouter);

app.use(errorHandlerMiddleware);

module.exports = app;
