import express from 'express';
const router = express.Router();

import {StatusCodes} from "http-status-codes";
import Task from '../auth/models/Task';
import mongoose from "mongoose";
import {authenticateToken} from "../auth/jwt/jwt";
import Test from '../auth/models/Test';

// Authenticate token
router.use(function(req: any, res: any, next: any) {
    authenticateToken(req, res, next);
});

// Tasks

router.get('/tasks', (req: any, res: any, next: any) => {
    // if (req.currentUser.role !== "admin") {
    //     return res.status(StatusCodes.UNAUTHORIZED);
    // }

    Task.find()
        .then((tasks) => {
            console.log(tasks);
            return res.status(StatusCodes.OK).send(tasks);
        })
        .catch((err) => {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err.message);
        })
});

router.get('/tasks/:id', (req: any, res: any, next: any) => {
    const { id } = req.params;
    console.log('Received request for task with ID:', id);
     Task.findById(id)
        .then((task) => {
            return res.status(StatusCodes.OK).send(task);
        })
        .catch((err) => {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err.message);
        })
});


router.post('/addTask', async (req: any, res: any, next: any) => {
    if (req.currentUser.role !== "admin") {
        return res.status(StatusCodes.UNAUTHORIZED);
    }
    const {name, difficulty, deadline, description, tests} = req.body;
    const date = new Date();
    const createdTests = <any>[];
    const createdTestsIds = <any>[];

    try {
        for (const test of tests) {
            const createdTest = await Test.create({input: test.input, output: test.output});
            createdTests.push(createdTest);
            createdTestsIds.push(createdTest._id);
        }

        await Task.create({name: name, date: date, difficulty: difficulty, deadline: deadline, description: description, tests: createdTestsIds})
        .then((task) => {
            return res.status(StatusCodes.CREATED).send({task, createdTests});
        });

    } catch (err: any) {
        console.error(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err.message);
    }
});

router.delete('/deleteTask/:id', async (req: any, res: any, next: any) => {
    console.log(req.currentUser);
    if (req.currentUser.role !== "admin") {
        return res.status(StatusCodes.UNAUTHORIZED);
    }
    const { id } = req.params;

    try {
        const deletedTask = await Task.findById(id);

        if (!deletedTask) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Task not found");
        }

        await Test.deleteMany({_id: { $in: deletedTask.tests }});

        await Task.deleteOne({ _id: id });

        return res.status(StatusCodes.NO_CONTENT).send();
    } catch (err: any) {
        console.error(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err.message);
    }
});

router.put('/editTask/:id', async (req: any, res: any, next: any) => {
    if (req.currentUser.role !== "admin") {
        return res.status(StatusCodes.UNAUTHORIZED);
    }
    const { id } = req.params;
    const {name, difficulty, deadline, description, tests} = req.body;

    const createdTests = <any>[];
    const createdTestsIds = <any>[];
    const updatedTestsIds = <any>[];
    const date = new Date();

    try {
        const editedTask = await Task.findById(id);

        if (!editedTask) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Task not found");
        }
        // Update existing tests
        for (let i = 0; i < Math.min(tests.length, editedTask.tests.length); i++) {
            const updatedTest = await Test.findByIdAndUpdate(editedTask.tests[i], tests[i]);
            updatedTestsIds.push(updatedTest?._id);
        }

        // Create new tests
        for (let j = editedTask.tests.length; j < tests.length; j++) {
            const newTest = await Test.create(tests[j]);
            createdTests.push(newTest);
            createdTestsIds.push(newTest._id);
        }

        // Delete extra tests
        for (let k = tests.length; k < editedTask.tests.length; k++) {
            await Test.findByIdAndDelete(editedTask.tests[k]);
        }

        const newTests = [...updatedTestsIds, ...createdTestsIds];

        await Task.updateOne({_id: id}, {name: name, date: date, difficulty: difficulty, deadline: deadline, description: description, tests: newTests});
        
        const updatedTask = await Task.findById(id);

        return res.status(StatusCodes.OK).send({task: updatedTask, createdTests});


    } catch (err: any) {
        console.error(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err.message);
    }
});

// Tests

router.get('/tests', (req: any, res: any, next: any) => {
    // if (req.currentUser.role !== "admin") {
    //     return res.status(StatusCodes.UNAUTHORIZED);
    // }

    Test.find()
        .then((tests) => {
            return res.status(StatusCodes.OK).send(tests);
        })
        .catch((err) => {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err.message);
        })
});

module.exports = router;
