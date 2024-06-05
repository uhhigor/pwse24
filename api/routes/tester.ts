import {type} from "os";

let express = require('express');

const router = express.Router();
let test1 = require('fs').readFileSync('./docker/python/main.py').toString()
let test2 = require('fs').readFileSync('./docker/python/main2.py').toString()
import {getContainer,Images} from '../tester/dispatcher'
import axios from "axios";
// import Task from '../tasks/Task'


// POST requires in body:
// Solution
// taskID
// userID
router.post("/check",async (req:any,res:any) => {
    console.log(req.body);
    const {solution,taskID,userID} = req.body;

    //reading from db
    let task = (await axios.get("http://localhost:3000/task/"+taskID)).data
    let testsT = (await axios.get("http://localhost:3000/tasktest/task/"+taskID)).data
    // getting language
    let language = task.language.toLowerCase()
    //this one will be changed for one from db
    // let testt1:Record<any, any> = {name:"test1",body:test1};
    // let testt2:Record<any, any> = {name:"test2",body:test2};
    // let tests = [testt1,testt2]
    let tests = testsT
    tests.forEach((t:any) => t.passed=false)

    let result = await Promise.all(tests.map(async (test:any) => {
        let func = getContainer(language)
        if(typeof func == 'function') {
            let {body,passed} = await func(test.body, solution)
            test.body = body;
            test.passed = passed
        }else res.send(func)
        return test;
    }))

    res.json(result)

})

module.exports = router;