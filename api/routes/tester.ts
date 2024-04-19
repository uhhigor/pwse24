let express = require('express');
const router = express.Router();
let main = require('fs').readFileSync('./docker/python/main.py').toString()
import {python} from '../tester/dispatcher'

router.get("/python",async (req: any, res: any) => {
    python(main, "").then((v: string) => {
            res.send(v);
        }).catch((err:any) => {
            res.send(err)
        })
})

module.exports = router;