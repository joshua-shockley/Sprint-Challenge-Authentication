const jwt = require('jsonwebtoken');
const secret = require('../api/secret/secret.js');


module.exports = function generateToken(user) {
    const payload = {
        subject: user.id,
        username: user.username,
        //any other data
    };
    const secrets = 'thisisa freaking secretof secrets!'; //currently importing in the secret from above otherwise it would b just secrets in the return.
    const options = {
        expiresIn: '1h',
    };

    return jwt.sign(payload, secret.jwtSecret, options);

}