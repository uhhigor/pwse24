import {type} from "os";

let express = require('express');
const router = express.Router();
let test1 = require('fs').readFileSync('./docker/python/main.py').toString()
let test2 = require('fs').readFileSync('./docker/python/main2.py').toString()
import {getContainer,Images} from '../tester/dispatcher'
// import Task from '../tasks/Task'

router.post("/check",async (req:any,res:any) => {
    console.log(req.body);
    const {language,solution,taskID} = req.body;


    // changing for reading from DB in the future
    let tests = [{name:"test1",body:test1,passed:false},{name:"test2",body:test2,passed: false}];
    let result = await Promise.all(tests.map(async (test:{name:string,body:string,passed:boolean}) => {
        let func = getContainer(language)
        if(typeof func == 'function') {
            let {body,passed} = await func(test.body, solution)
            test.body = body;
            test.passed = passed
        }else res.send(func)
        return test;
    }))

    // result = result.map((res:any) => {
    //     let passed = (res.body.charAt(res.body.length - 1) == "0");
    //     res.body = res.body.slice(0,-1)
    //     res.passed = passed;
    //     return res;
    // })
    res.json(result)

    // containers[language](test1,solution).then((result:string) => {
    //     res.send(result)
    // }).catch((err:any) => {
    //     res.send(err)
    // })
    // const task:any = Task.findById(taskID);
    // task.get("tests")
    // const tests = task.get("tests");
})

module.exports = router;