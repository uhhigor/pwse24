let express = require('express');
const router = express.Router();
let main = require('fs').readFileSync('./docker/python/main.py').toString()
import {python} from '../tester/dispatcher'
import Task from '../tasks/Task'

router.get("/python",async (req: any, res: any) => {
    python(main, "").then((v: string) => {
            res.send(v);
        }).catch((err:any) => {
            res.send(err)
        })
})

router.post("/test",(req:any,res:any) => {
    console.log(req.body);
    const {solution,taskID} = req.body;
    // const task:any = Task.findById(taskID);
    // task.get("tests").
    // const tests = task.get("tests");

    res.json(req.body);
})

module.exports = router;