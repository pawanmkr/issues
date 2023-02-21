import { add_user } from '../models/user.js';
import handleError from '../utils/handleError.js';
async function generate_hash(password) {
    // implement hashing function here
}
const signup = async (req, res) => {
    if (req.body === null) {
        res.send(404).json({
            "Error": "No data available for signup!!"
        });
        return;
    }
    try {
        const { full_name, user_name, email, password } = req.body;
        await add_user(full_name, user_name, email, password);
        // now after signup redirect user to homefeed 
        // without asking for credentials again: for this first implement the login function and then generate a session for the user and send back in response
        await createSession(user_name, password);
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
        const { user_name, password } = req.body;
        const hash = await find_user_hash(user_name);
        if (hash === await generate_hash(password)) {
            // now after signup redirect user to homefeed 
            // without asking for credentials again: for this first implement the login function and then generate a session for the user and send back in response
            await createSession(user_name, password);
        }
        else {
            // create a util error handler for responsive error on server
            res.send(404).send({
                "Error": "username or password is wrong!"
            });
        }
    }
    catch (error) {
        handleError(error, "sign up failed");
    }
};
export { signup, };
//# sourceMappingURL=user.js.map