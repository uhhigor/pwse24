import express from 'express';
const router = express.Router();

import {StatusCodes} from "http-status-codes";
import User from "../auth/models/User";
import mongoose from "mongoose";
import {authenticateToken} from "../auth/jwt/jwt";
import Task from "../auth/models/Task";
import TaskSolution from "../tasks/TaskSolution";

// Authenticate token
router.use(function(req: any, res: any, next: any) {
    authenticateToken(req, res, next);
});

// GET all tasks solutions

router.get('/', function(req: any, res: any, next: any) {
    if(req.currentUser.role !== "admin") return res.status(StatusCodes.UNAUTHORIZED).send("Unauthorized");
    TaskSolution.find().then((solutions) => {
        return res.status(StatusCodes.OK).send(solutions);
    }).catch((err) => {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err.message);
    });
});

// GET task solution

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

// POST add task solution
router.post('/', function(req: any, res: any, next: any) {
    if(!mongoose.isValidObjectId(req.params.id)) {
        return res.status(StatusCodes.BAD_REQUEST).send("Invalid id");
    }
    const { userId, taskId, score } = req.body;
    if (!userId || !taskId || !score) {
        return res.status(StatusCodes.BAD_REQUEST).send("Missing parameters");
    }
    let filePath = null;
    TaskSolution.create({userId, taskId, filePath, score}).then((user) => {
        if (user) {
            return res.status(StatusCodes.OK).send(user);
        } else {
            return res.status(StatusCodes.NOT_FOUND).send("User not found");
        }
    }).catch((err) => {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err.message);
    });
});

// PUT update task solution
router.put('/:id', function(req: any, res: any, next: any) {
    if(!mongoose.isValidObjectId(req.params.id)) {
        return res.status(StatusCodes.BAD_REQUEST).send("Invalid id");
    }
    const { userId, taskId, score } = req.body;
    if (!userId || !taskId || !score) {
        return res.status(StatusCodes.BAD_REQUEST).send("Missing parameters");
    }
    TaskSolution.findByIdAndUpdate(req.params.id, req.body).then((user) => {
        if (user) {
            return res.status(StatusCodes.OK).send(user);
        } else {
            return res.status(StatusCodes.NOT_FOUND).send("User not found");
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
