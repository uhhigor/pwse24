import express from 'express';
const router = express.Router();

import userManager from '../auth/UserManager';
import mongoose from 'mongoose';
import {StatusCodes} from "http-status-codes";

// GET all users
router.get('/', async function(req: any, res: any, next: any) {
    await userManager.getAllUsers((err, users) => {
        if (err) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err.message);
        } else {
            res.status(StatusCodes.OK).send(users);
        }
    });
});

// GET a user by id

router.get('/:id', async function(req: any, res: any, next: any) {
    await userManager.getUserById(req.params.id, (err, user) => {
        if (err) {
            res.status(StatusCodes.NOT_FOUND).send(err.message);
        } else {
            res.status(StatusCodes.OK).send(user);
        }
    });
});

// POST a new user

router.post('/', async function(req: any, res: any, next: any) {
    await userManager.createUser(req.body, (err, user) => {
        if (err) {
            res.status(StatusCodes.BAD_REQUEST).send(err.message);
        } else {
            res.status(StatusCodes.CREATED).send(user);
        }
    });
});

// PUT update a user

router.put('/:id', async function(req: any, res: any, next: any) {
    await userManager.updateUser(req.params.id, req.body, (err, user) => {
        if (err) {
            res.status(StatusCodes.BAD_REQUEST).send(err.message);
        }
        else {
            res.status(StatusCodes.OK).send(user);
        }
    });
});

// DELETE a user

router.delete('/:id', async function(req: any, res: any, next: any) {
    await userManager.deleteUser(req.params.id, (err, user) => {
        if (err) {
            res.status(StatusCodes.BAD_REQUEST).send(err.message);
        }
        else {
            res.status(StatusCodes.OK).send(user);
        }
    });
});

module.exports = router;
