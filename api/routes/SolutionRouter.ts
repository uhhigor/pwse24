import express from 'express';

const router = express.Router();

import {StatusCodes} from "http-status-codes";
import mongoose from "mongoose";
import {authenticateToken} from "../auth/jwt/jwt";
import TaskSolution from "../tasks/TaskSolution";
import User from "../auth/model/User";

// Authenticate token
router.use(function (req: any, res: any, next: any) {
    authenticateToken(req, res, next);
});

// GET all tasks solutions by task id

router.get('/task/:taskid', function (req: any, res: any, next: any) {
    if (req.currentUser.role !== "admin") return res.status(StatusCodes.UNAUTHORIZED).send("Unauthorized");

    let taskId = req.params.taskId;
    if (!mongoose.isValidObjectId(taskId)) {
        return res.status(StatusCodes.BAD_REQUEST).send("Invalid id");
    }
    TaskSolution.find({taskId: taskId}).then((solutions) => {
        if (!solutions) return res.status(StatusCodes.NOT_FOUND).send("Solutions not found");
        return res.status(StatusCodes.OK).send(solutions);
    }).catch((err) => {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err.message);
    });
});

// GET all tasks solutions by user id
router.get('/user/:userid', function (req: any, res: any, next: any) {
    let userId = req.params.userId;
    if (!mongoose.isValidObjectId(userId)) {
        return res.status(StatusCodes.BAD_REQUEST).send("Invalid id");
    }
    TaskSolution.find({userId: userId}).then((solutions) => {
        if (!solutions) return res.status(StatusCodes.NOT_FOUND).send("Solutions not found");
        return res.status(StatusCodes.OK).send(solutions);
    }).catch((err) => {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err.message);
    });
});

// GET task solution by id
router.get('/:id', function (req: any, res: any, next: any) {
    if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(StatusCodes.BAD_REQUEST).send("Invalid id");
    }
    TaskSolution.findOne({email: req.params.email}).then((solution) => {
        if (solution) {
            return solution;
        } else {
            return res.status(StatusCodes.NOT_FOUND).send("Solution not found");
        }
    }).catch((err) => {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err.message);
    });
});


// GET task solution by user id and task id
router.get('/user/:userid/task/:taskid', function (req: any, res: any, next: any) {
    if (!mongoose.isValidObjectId(req.params.userid) || !mongoose.isValidObjectId(req.params.taskid)) {
        return res.status(StatusCodes.BAD_REQUEST).send("Invalid id");
    }
    TaskSolution.findOne({userId: req.params.userid, taskId: req.params.taskid}).then((solution) => {
        if (solution) {
            return res.status(StatusCodes.OK).send(solution);
        } else {
            return res.status(StatusCodes.NOT_FOUND).send("Solution not found");
        }
    }).catch((err) => {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err.message);
    });
});

// POST add task solution to task
router.post('/task/:taskid', async function (req: any, res: any, next: any) {
    try {
        let taskId = req.params.taskid;
        if (!mongoose.isValidObjectId(taskId)) {
            return res.status(StatusCodes.BAD_REQUEST).send("Invalid id");
        }

        const { userEmail, score, textBlob } = req.body;

        const user = await User.findOne().where('email').equals(userEmail).select('_id').exec();

        if (!user) {
            return res.status(StatusCodes.NOT_FOUND).send("User not found");
        }

        let userId = user._id;
        console.log(userId);
        const solution = await TaskSolution.create({ userId, taskId, textBlob, score });
        if (solution) {
            return res.status(StatusCodes.OK).send(solution);
        } else {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Error while saving solution");
        }
    } catch (err : any ) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err.message);
    }
});

// DELETE task solution

router.delete('/:id', async function (req: any, res: any, next: any) {
    if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(StatusCodes.BAD_REQUEST).send("Invalid id");
    }
    TaskSolution.findByIdAndDelete(req.params.id).then((solution) => {
        if (solution) {
            return res.status(StatusCodes.OK).send(solution);
        } else {
            return res.status(StatusCodes.NOT_FOUND).send("Solution not found");
        }
    }).catch((err) => {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err.message);
    });
});

module.exports = router;
