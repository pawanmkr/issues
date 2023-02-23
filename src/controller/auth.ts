import dotenv from 'dotenv';
dotenv.config()
import bcrypt from 'bcrypt';
import { add_user, find_user_hash } from '../models/user.js';
import handleError from '../utils/handleError.js';
import jwt from 'jsonwebtoken';
import { resolve } from 'path';

async function check_null(req, res) {
    if (!req.body) { // edge case if data is null
        res.send({
            "Error": "Request body is empty!"
        });
        res.status(401);
        return
    }
};

async function generate_hash(password) {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, 10, function(err, hash) {
            if (err) {
                reject(err);
            }
            resolve(hash);
        });
    }
)};

async function generate_token(username, res) {
    const secret_key = process.env.SECRET_ACCESS_TOKEN;
    const token = await jwt.sign({user: username}, secret_key); // payload, secret_token
    res.send({ "token": token });
};

const signup = async (req, res) => {
    console.log(req.body);
    console.log(1);
    await check_null(req, res);
    try {
        const { first_name, last_name, username, email, password } = req.body;
        const password_hash = await generate_hash(password);
        const new_user: any = await add_user(first_name, last_name, username, email, password_hash);
        if (new_user) await generate_token(username, res);
    } catch(error) {
        handleError(error, "sign up failed");
    }
}

const login = async (req, res) => {
    await check_null(req, res);
    try {
        const { username, password } = req.body;
        const hash = await find_user_hash(username);
        const match = await bcrypt.compare(password, hash);

        if (match) {
            await generate_token(username, res);
        } else {
            res.send(401).json({ "Message": "Invalid Credentials" });
        }
    } catch(error) {
        handleError(error, "login failed");
    }
};

export {
    signup,
    login
}