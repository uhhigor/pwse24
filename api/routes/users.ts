import express from 'express';
const router = express.Router();

import {StatusCodes} from "http-status-codes";
import User from "../auth/models/User";
import mongoose from "mongoose";
import {authenticateToken} from "../auth/jwt/jwt";

// Authenticate token
router.use(function(req: any, res: any, next: any) {
    authenticateToken(req, res, next);
});

// GET user by email, returns user

router.get('/:email', function(req: any, res: any, next: any) {
    if(!mongoose.isValidObjectId(req.params.id)) {
        return res.status(StatusCodes.BAD_REQUEST).send("Invalid id");
    }
    User.findOne({email: req.params.email}).then((user) => {
        if (user) {
            if(user.email === req.currentUser.email || req.currentUser.role === "admin")
                return res.status(StatusCodes.OK).send(user);
            else
                return res.status(StatusCodes.UNAUTHORIZED).send("Unauthorized");
        } else {
            return res.status(StatusCodes.NOT_FOUND).send("User not found");
        }
    }).catch((err) => {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err.message);
    });
});

// GET all users, returns array of users

router.get('/', function(req: any, res: any, next: any) {
    if(req.currentUser.role !== "admin") return res.status(StatusCodes.UNAUTHORIZED).send("Unauthorized");
    User.find().then((users) => {
        return res.status(StatusCodes.OK).send(users);
    }).catch((err) => {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err.message);
    });
});

// PUT update user, returns user before update

router.put('/:id', function(req: any, res: any, next: any) {
    if(!mongoose.isValidObjectId(req.params.id)) {
        return res.status(StatusCodes.BAD_REQUEST).send("Invalid id");
    }
    const { name, surname, email, password } = req.body;
    if (!name || !surname || !email || !password
        || name === "" || surname === "" || email === "" || password === "") {
        return res.status(StatusCodes.BAD_REQUEST).send("Missing parameters");
    }
    User.findByIdAndUpdate(req.params.id, req.body).then((user) => {
        if (user) {
            return res.status(StatusCodes.OK).send(user);
        } else {
            return res.status(StatusCodes.NOT_FOUND).send("User not found");
        }
    }).catch((err) => {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err.message);
    });
});

// DELETE user, returns user before deletion

router.delete('/:id', async function(req: any, res: any, next: any) {
    if(!mongoose.isValidObjectId(req.params.id)) {
        return res.status(StatusCodes.BAD_REQUEST).send("Invalid id");
    }
    User.findByIdAndDelete(req.params.id).then((user) => {
        if (user) {
            return res.status(StatusCodes.OK).send(user);
        } else {
            return res.status(StatusCodes.NOT_FOUND).send("User not found");
        }
    }).catch((err) => {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err.message);
    });
});

module.exports = router;
