import {getContainer} from '../tester/dispatcher'
import Task from "../tasks/Task";
import Test from "../tasks/TaskTest";
import mongoose from "mongoose";
import {StatusCodes} from "http-status-codes";

let express = require('express');

const router = express.Router();

let getTests = async (taskId:any) :Promise<any> => {
    try {
        if (!mongoose.Types.ObjectId.isValid(taskId)) {
            return Promise.reject( 'Invalid task id');
        }

        const task = await Task.findById(taskId);
        if (!task) {
            return Promise.reject('Task not found');
        }

        const tests = await Test.find({ _id: { $in: task.tests } });
        return Promise.resolve(tests);
    } catch (err:any) {
        return Promise.reject(err.message );
    }
};

let getTask = async (id:any) => {
    try {
        const task = await Task.findById(id);
        if (!task) {
            return Promise.reject( 'Task not found');
        }
        return Promise.resolve(  task );
    } catch (err:any) {
        return Promise.reject(err.message );
    }
};


// POST requires in body:
// Solution
// taskID
// userID
router.post("/check",async (req:any,res:any) => {
    const {solution,taskID,userEmail} = req.body;

    let task = await getTask(taskID).catch((e:any) => res.status(StatusCodes.NOT_FOUND).send(e));
    let testsT = await getTests(taskID).catch((e:any) => res.status(StatusCodes.NOT_FOUND).send(e));
    let language:string = task.language.toLowerCase()

    let tests = testsT.map((t:any) => {
        console.log("Map")
        console.log(t.givenInput)
        console.log(t.expectedOutput)
        return {
            _id: t._id,
            givenInput: t.givenInput,
            expectedOutput:t.expectedOutput,
            passed: false
        }
    })
    let result = await Promise.all(tests.map(async (test:any) => {
        let func = getContainer(language)
        if(typeof func == 'function') {
            let {body,passed} = await func(test.givenInput,test.expectedOutput, solution)
            test.body = body;
            console.log("test result")
            console.log(body)
            test.passed = passed
        } else res.status(StatusCodes.NOT_FOUND).send(func)
        return test;
    }))

    res.json(result)

})

module.exports = router;