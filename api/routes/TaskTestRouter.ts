import express from 'express';
const router = express.Router();

import {StatusCodes} from "http-status-codes";
import {authenticateToken} from "../auth/jwt/jwt";
import Task from "../tasks/Task";
import Test from "../tasks/TaskTest";
import mongoose from "mongoose";
import TaskTest from "../tasks/TaskTest";

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

// POST add task test to task
router.post('/task/:taskid', function(req: any, res: any, next: any) {
    let taskId = req.params.taskId;
    if(!mongoose.isValidObjectId(taskId)) {
        return res.status(StatusCodes.BAD_REQUEST).send("Invalid id");
    }
    const { givenInput, expectedOutput, textBlob } = req.body;
    if (!givenInput || !expectedOutput || !textBlob) {
        return res.status(StatusCodes.BAD_REQUEST).send("Missing parameters");
    }
    TaskTest.create({givenInput, expectedOutput, taskId, textBlob}).then((solution) => {
        if (solution) {
            return res.status(StatusCodes.OK).send(solution);
        } else {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Error while saving task test");
        }
    }).catch((err) => {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err.message);
    });
});

module.exports = router;
