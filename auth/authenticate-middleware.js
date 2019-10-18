/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/
//bring in the jwt and secret to verify them

const jwt = require('jsonwebtoken');

const secret = require('../api/secret/secret.js');

module.exports = (req, res, next) => {
    const token = req.headers.authorization;

    if (token) {
        jwt.verify(token, secret.jwtSecret, (err, decodedToken) => {
            if (err) {
                res.status(401).json({ err, message: 'there was and error with the token' })
            } else {
                req.user = {
                    userId: decodedToken.Id,
                    username: decodedToken.username,
                }
                console.log('getting to here', req.user);
                next();
            }
        })
    } else {
        res.status(401).json({ you: 'shall not pass!' });
    }
};