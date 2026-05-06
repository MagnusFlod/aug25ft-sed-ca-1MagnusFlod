const db = require('../models');

// Importing the basic-auth package
const auth = require('basic-auth');

function isAuth(req, res, next)
{
    // Making a user-variable
    const user = auth(req);

    // If the user is missing or username or password is incorrect, the request is blocked or unauthorized
    if(!user || user.name !== 'admin' || user.pass !== 'P4ssword')
    {
        return res.status(401).json({ message: 'Missing credentials or wrong username or password' });
    }

    // If all correct credentials are met, the auth-function runs correct and to the next step in the request
    next();
}

module.exports = isAuth;