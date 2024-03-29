import jwt from 'jsonwebtoken';
import {StatusCodes} from "http-status-codes";
import User from "../models/User";

function generateToken(email: String, role: String) {
    return jwt.sign({ email, role }, process.env.ACCESS_TOKEN_SECRET!, { expiresIn: '1h' });
}

function verifyToken(token: string) {
    return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!);
}

function authenticateToken(req: any, res: any, next: any) {
    const token = req.cookies.token;
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!, (err: any, data: any) => {
        if (err) return res.sendStatus(StatusCodes.UNAUTHORIZED);
        let email = data.email;
        let role = data.role;
        req.currentUser = { email, role };
        next();
    });
}

export { generateToken, verifyToken, authenticateToken };