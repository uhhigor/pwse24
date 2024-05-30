import express from 'express';
const router = express.Router();

import {StatusCodes} from "http-status-codes";
import {authenticateToken} from "../auth/jwt/jwt";
import Task from "../tasks/Task";
import Test from "../tasks/TaskTest";
import mongoose from "mongoose";

// Authenticate token
router.use(function(req: any, res: any, next: any) {
    authenticateToken(req, res, next);
});

router.get('/', (req: any, res: any, next: any) => {
    Test.find()
        .then((tests) => {
            if(!tests) {
                return res.status(StatusCodes.NOT_FOUND).send('Tests not found');
            }
            return res.status(StatusCodes.OK).send(tests);
        })
        .catch((err) => {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err.message);
        })
});

router.get('/task/:taskId', (req: any, res: any, next: any) => {
    let taskId = req.params.taskId;
    if (!mongoose.Types.ObjectId.isValid(taskId)) {
        return res.status(StatusCodes.BAD_REQUEST).send('Invalid task id');
    }
    Task.findById(taskId)
        .then((task) => {
            if (!task) {
                return res.status(StatusCodes.NOT_FOUND).send('Task not found');
            }
            Test.find({_id: { $in: task.tests }})
                .then((tests) => {
                    return res.status(StatusCodes.OK).send(tests);
                })
                .catch((err) => {
                    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err.message);
                })
        })
        .catch((err) => {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err.message);
        })
});

module.exports = router;
