import express from 'express';
const router = express.Router();

import {StatusCodes} from "http-status-codes";
import User from "../auth/models/User";
import {hashPassword, comparePassword} from "../auth/bcrypt";
import {generateToken, verifyToken} from "../auth/jwt/jwt";

// POST login, returns token
router.post('/login', function(req: any, res: any, next: any) {
    const {email, password} = req.body;
    if (!email || !password || email === "" || password === "") {
        return res.status(StatusCodes.BAD_REQUEST).send("Missing parameters");
    }
    User.findOne({email: email}).then((user) => {
        if (user) {
            comparePassword(password, user.password).then((result) => {
                if (result) {
                    let token = generateToken(user.email, user.role);
                    return res.status(StatusCodes.OK).send(token);
                } else {
                    return res.status(StatusCodes.BAD_REQUEST).send("Invalid email or password");
                }
            }).catch((err) => {
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err.message);
            });
        } else {
            return res.status(StatusCodes.NOT_FOUND).send("User not found");
        }
    }).catch((err) => {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err.message);
    });
});

// POST register, returns user
router.post('/register', function(req: any, res: any, next: any) {
    const {name, surname, email, password} = req.body;
    if (!name || !surname || !email || !password
        || name === "" || surname === "" || email === "" || password === "") {
        return res.status(StatusCodes.BAD_REQUEST).send("Missing parameters");
    }
    User.findOne({email: req.body.email}).then((user) => {
        if (user) {
            return res.status(StatusCodes.BAD_REQUEST).send("User with specified email already exists.");
        }
        else {
            hashPassword(password).then((hash) => {
                User.create({name, surname, email, password: hash}).then((user) => {
                    return res.status(StatusCodes.CREATED).send(user);
                }).catch((err) => {
                    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err.message);
                });
            }).catch((err) => {
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err.message);
            });
        }
    });

});

module.exports = router;