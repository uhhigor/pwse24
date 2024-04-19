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
let adminRouter = require('./routes/admin.ts');
let testerRouter = require('./routes/tester')

const app = express();
app.use(cors({
    origin: 'http://localhost:5005',
    credentials: true
}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);
app.use('/admin', adminRouter);
app.use('/tester', testerRouter);

database_connect();


module.exports = app;
