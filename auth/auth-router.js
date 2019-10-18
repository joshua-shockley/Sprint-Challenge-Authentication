const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secret = require('../api/secret/secret.js');
const Users = require('./Auth-Model.js');

router.post('/register', (req, res) => {
    // implement registration
    const user = req.body; //setting up what to send to add

    const hash = bcrypt.hashSync(user.password, 8); //this creates the hash
    user.password = hash; //this sets the value of the has to the created password

    Users.add(user)
        .then(newUser => {
            res.status(200).json({ newUser });
        })
        .catch(error => {
            res.status(500).json({ error, Message: ' unable to add user' });
        });
});

router.post('/login', (req, res) => {
    const { username, password } = req.body;
    console.log(req.body, username, password);
    Users.findBy({ username })
        .first()
        .then(user => {
            console.log(user, 'in .then');
            if (user && bcrypt.compareSync(password, user.password)) {

                // res.json({ message: 'made it past bcrypt' });
                console.log('hello from before generate token');
                req.session.userId = user.id;
                // const token = makeToken(user);
                res.status(200).json({
                    message: `welcome ${user.username}`
                        // token,
                        // userid: user.id,
                        // username: user.username,
                });

            } else {
                console.log('now in the else')
                res.status(401).json({ message: ' Credentials dont match' })
            };
        })
        .catch(error => {
            console.log('now its in the catch')
            res.status(500).json({ message: 'skipping to catch from if' });
        });
});

// function makeToken(user) {
//     console.log('in gen token');
//     const payload = {
//         subject: user.id,
//         username: user.username,
//     };
//     options = {
//         exipresIn: '1d',
//     };
//     // console.log(payload, options, secret.jwtSecret);
//     return jwt.sign(payload, secret.jwtSecret, options); //make a secret in another file and import
// }

module.exports = router;