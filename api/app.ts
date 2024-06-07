import express from 'express';
import path from 'path';

import cookieParser from 'cookie-parser';
import logger from 'morgan';
import dotenv from 'dotenv';
import cors from 'cors';
const router = require('express').Router;

import database_connect from './database/db';

dotenv.config();

// Routes

let indexRouter = require('./routes/index.ts');
let usersRouter = require('./routes/users.ts');
let authRouter = require('./routes/auth.ts');


let taskRouter = require('./routes/TaskRouter.ts');
let taskTestRouter = require('./routes/TaskTestRouter.ts');
let solutionRouter = require('./routes/SolutionRouter.ts');
let testerRouter = require('./routes/tester.ts')


const app = express();
app.use(cors({
    origin: ['http://localhost:5005'],
    credentials: true,
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);

app.use('/task', taskRouter);
app.use('/tasktest', taskTestRouter);
app.use('/solution', solutionRouter);
app.use('/tester',testerRouter)

database_connect().then(() => {
    console.log('Connected to database');
}).catch((err) => {
    console.error("Error connecting to database", err);
});

module.exports = app;
