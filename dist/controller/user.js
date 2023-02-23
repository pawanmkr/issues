import bcrypt from 'bcrypt';
import { add_user, find_user_hash } from '../models/user.js';
import handleError from '../utils/handleError.js';
import jwt from 'jsonwebtoken';
async function generate_hash(password) {
    bcrypt.hash(password, 10, function (err, hash) {
        if (err) {
            handleError(err, "hash generation failed");
        }
        return hash;
    });
}
;
async function create_session(username, password) {
}
const signup = async (req, res) => {
    if (req.body === null) {
        res.send(404).json({
            "Error": "No data available for signup!!"
        });
        return;
    }
    try {
        const { full_name, username, email, password } = req.body;
        const password_hash = await generate_hash(password);
        const new_user = await add_user(full_name, username, email, password_hash);
        if (new_user) {
            await create_session(username, password);
        }
    }
    catch (error) {
        handleError(error, "sign up failed");
    }
};
const login = async (req, res) => {
    if (req.body === null) {
        res.send(404).json({
            "Error": "No data available for signup!!"
        });
        return;
    }
    try {
        const { username, password } = req.body;
        const hash = await find_user_hash(username);
        const match = await bcrypt.compare(password, hash);
        if (match) {
            const token = jwt.sign();
            await create_session(username, password);
        }
    }
    catch (error) {
        handleError(error, "login failed");
    }
};
export { signup, login };
// todo --create_session
//# sourceMappingURL=user.js.map