import dotenv from 'dotenv';
dotenv.config()
import jwt from 'jsonwebtoken';
import handleError from "../utils/handleError.js"

const authenticate = async (req, res , nex) => {
    try {
        const authHeader = req.headers('authorization');
        const token = authHeader && authHeader(' ')[1];
        if (!token) return res.sendStatus(401);
        await jwt.verify(token, process.env.SECRET_ACCESS_TOKEN as string, (err: any, user: any) => {
            if (err) {
                handleError(err, "token verification failed");
                res.sendStatus(403);
            }
            req.user = user;

            nex()
        });
    } catch (error) {
        handleError(error, "Failed Authenticating User");
    }
}

export {
    authenticate
}