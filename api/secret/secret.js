module.exports = {
        jwtSecret: process.env.JWT_SECRET || 'this is the secret of the secrets!',
    } //this is all we need for the secret... a default and an enviroment setup .. string default is to make sure you have a secret incase the env isn't present