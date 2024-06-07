import express from 'express';

const router = express.Router();

import {StatusCodes} from "http-status-codes";
import User from "../auth/model/User";
import mongoose from "mongoose";
import {authenticateToken} from "../auth/jwt/jwt";
import {hashPassword} from "../auth/bcrypt/bcrypt";

// Authenticate token
router.use(function (req: any, res: any, next: any) {
    authenticateToken(req, res, next);
});

// GET user by email, returns user

router.get('/:email', function (req: any, res: any, next: any) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(req.params.email)) {
        return res.status(StatusCodes.BAD_REQUEST).send("Invalid email format");
    }
    User.findOne({email: req.params.email}).then((user) => {
        if (user) {
            if (user.email === req.params.email || req.params.role === "admin")
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

router.get('/', function (req: any, res: any, next: any) {
    User.find().then((users) => {
        return res.status(StatusCodes.OK).send(users);
    }).catch((err) => {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err.message);
    });
});

// PUT update user, returns user before update

router.put('/:email', async (req, res) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(req.params.email)) {
        return res.status(StatusCodes.BAD_REQUEST).send("Invalid email format");
    }

    const {name, surname, email, password} = req.body;
    if (!name || !surname || !email || !password) {
        return res.status(StatusCodes.BAD_REQUEST).send("Missing parameters");
    }

    try {
        const user = await User.findOne({email: req.params.email});
        if (!user) {
            return res.status(StatusCodes.NOT_FOUND).send("User not found");
        }
        const hashedPassword = await hashPassword(password);

        user.name = name;
        user.surname = surname;
        user.email = email;
        user.password = hashedPassword;

        await user.save();

        return res.status(StatusCodes.OK).send(user);
    } catch (err : any) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err.message);
    }
});

// DELETE user, returns user before deletion

router.delete('/:id', async function (req: any, res: any, next: any) {
    if (!mongoose.isValidObjectId(req.params.id)) {
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
