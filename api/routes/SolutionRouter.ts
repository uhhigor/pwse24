import express from 'express';
const router = express.Router();

import {StatusCodes} from "http-status-codes";
import mongoose from "mongoose";
import {authenticateToken} from "../auth/jwt/jwt";
import TaskSolution from "../tasks/TaskSolution";

// Authenticate token
router.use(function(req: any, res: any, next: any) {
    authenticateToken(req, res, next);
});

// GET all tasks solutions by task id

router.get('/task/:taskid', function(req: any, res: any, next: any) {
    if (req.currentUser.role !== "admin") return res.status(StatusCodes.UNAUTHORIZED).send("Unauthorized");

    let taskId = req.params.taskId;
    if(!mongoose.isValidObjectId(taskId)) {
        return res.status(StatusCodes.BAD_REQUEST).send("Invalid id");
    }
    TaskSolution.find({taskId: taskId}).then((solutions) => {
        if(!solutions) return res.status(StatusCodes.NOT_FOUND).send("Solutions not found");
        return res.status(StatusCodes.OK).send(solutions);
    }).catch((err) => {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err.message);
    });
});

// GET task solution by id
router.get('/:id', function(req: any, res: any, next: any) {
    if(!mongoose.isValidObjectId(req.params.id)) {
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

// POST add task solution to task
router.post('/task/:taskid', function(req: any, res: any, next: any) {
    let taskId = req.params.taskId;
    if(!mongoose.isValidObjectId(taskId)) {
        return res.status(StatusCodes.BAD_REQUEST).send("Invalid id");
    }
    const { userId, score, textBlob } = req.body;
    if (!userId || !score || !textBlob) {
        return res.status(StatusCodes.BAD_REQUEST).send("Missing parameters");
    }
    TaskSolution.create({userId, taskId, textBlob, score}).then((solution) => {
        if (solution) {
            return res.status(StatusCodes.OK).send(solution);
        } else {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Error while saving solution");
        }
    }).catch((err) => {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err.message);
    });
});

// DELETE task solution

router.delete('/:id', async function(req: any, res: any, next: any) {
    if(!mongoose.isValidObjectId(req.params.id)) {
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
