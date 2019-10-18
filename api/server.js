const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const bcryt = require('bcryptjs');
const authenticate = require('../auth/authenticate-middleware.js');
const authRouter = require('../auth/auth-router.js');
const jokesRouter = require('../jokes/jokes-router.js');

const session = require('express-session');
const knexSessionStore = require('connect-session-knex')(session);
const knexConfig = require('../database/dbConfig.js');
const server = express();

const sessionConfig = {
    name: 'turtle',
    secret: 'this is the secret',
    cookie: {
        maxAge: 1000 * 60 * 60,
        secure: false,
        httpOnly: true,
    },
    resave: false,
    saveUninitialized: true,
    store: new knexSessionStore({
        knex: knexConfig,
        createtable: true,
        clearInterval: 1000 * 60 * 30,
    })
};

//global middelware
server.use(express.json());
server.use(helmet());
server.use(cors());
server.use(session(sessionConfig));

server.use('/api/auth', authRouter);
server.use('/api/jokes', authenticate, jokesRouter);

server.get('/', (req, res) => {
    res.status(200).json({ hello: ' can you see this?' });
});

module.exports = server;