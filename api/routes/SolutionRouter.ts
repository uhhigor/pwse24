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
    TaskSolution.find({task: taskId}).then((solutions) => {
        if (!solutions) return res.status(StatusCodes.NOT_FOUND).send("Solutions not found");
        return res.status(StatusCodes.OK).send(solutions);
    }).catch((err) => {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err.message);
    });
});

// GET all tasks solutions by user id
router.get('/user/:userId', function (req: any, res: any, next: any) {
    let userId = req.params.userId;
    if (!mongoose.isValidObjectId(userId)) {
        return res.status(StatusCodes.BAD_REQUEST).send("Invalid id");
    }
    TaskSolution.find({user: userId}).then((solutions) => {
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
    TaskSolution.findOne({user: req.params.userid, task: req.params.taskid}).then((solution) => {
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

        const { user, textBlob, score } = req.body;

        console.log("AAAA " + user);
        if (!mongoose.isValidObjectId(user)) {
            return res.status(StatusCodes.BAD_REQUEST).send("Invalid user id");
        }

        const solution = await TaskSolution.create({user: user, task: taskId, textBlob: textBlob, score: score});
        if (solution) {
            return res.status(StatusCodes.OK).send(solution);
        } else {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Error while saving solution");
        }
    } catch (err : any ) {
        console.log("CCCC " + err.message);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err.message);
    }
});

// PUT update task solution

router.put('/:id', async function (req: any, res: any, next: any) {
    if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(StatusCodes.BAD_REQUEST).send("Invalid id");
    }

    const { user, textBlob, score } = req.body;
    if (!mongoose.isValidObjectId(user)) {
        return res.status(StatusCodes.BAD_REQUEST).send("Invalid user id");
    }

    TaskSolution.findByIdAndUpdate(req.params.id, {user: user, textBlob: textBlob, score: score}, {new: true}).then((solution) => {
        if (solution) {
            return res.status(StatusCodes.OK).send(solution);
        } else {
            return res.status(StatusCodes.NOT_FOUND).send("Solution not found");
        }
    }).catch((err) => {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err.message);
    });
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
