const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secret = require('../api/secret/secret.js');
const Users = require('./Auth-Model.js');

const generateToken = require('../database/makeToken.js');

router.post('/register', (req, res) => {
    // implement registration
    const user = req.body; //setting up what to send to add

    const hash = bcrypt.hashSync(user.password, 8); //this creates the hash
    user.password = hash; //this sets the value of the has to the created password

    Users.add(user)
        .then(newUser => {
            req.session.userId = newUser.id;

            res.status(200).json({ newUser });
        })
        .catch(error => {
            res.status(500).json({ error, Message: ' unable to add user' });
        });
});

router.post('/login', (req, res) => {
    const { username, password } = req.body;
    Users.findBy({ username })
        .first()
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {

                const token = generateToken(user);
                // req.session.userId = user.id;

                res.status(200).json({
                    message: `welcome ${user.username}`,
                    token,
                    username: user.username,
                    userId: user.id,
                });
            } else {
                console.log('now in the else')
                res.status(401).json({ message: ' Credentials dont match' });
            }
        })
        .catch(error => {
            console.log('now its in the catch')
            res.status(500).json({ message: 'skipping to catch from if' });
        });
});


//currently importing the token fn from its own file and its working
// function generateToken(user) {
//     const payload = {
//         subject: user.id,
//         username: user.username,
//         //any other data
//     };
//     const secrets = 'thisisa freaking secretof secrets!'; //currently importing in the secret from above otherwise it would b just secrets in the return.
//     const options = {
//         expiresIn: '1h',
//     };

//     return jwt.sign(payload, secret.jwtSecret, options);
// }


module.exports = router;