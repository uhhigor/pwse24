import express from 'express';
import path from 'path';

import cookieParser from 'cookie-parser';
import logger from 'morgan';
const router = require('express').Router;

import database_connect from './database/db';


// Routes

let indexRouter = require('./routes/index.ts');
let usersRouter = require('./routes/users.ts');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

database_connect();


module.exports = app;
