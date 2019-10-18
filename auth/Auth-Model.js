//pull in the config as db
const db = require('../database/dbConfig.js');

module.exports = {
    add,
    findBy,
    findById
};


function add(user) {
    return db('users')
        .insert(user, 'id')
        .then(([id]) => {
            return findById(id)
                .select('id', 'username');
        });
};

function findBy(filter) {
    // console.log(filter, 'from auth-model');
    return db('users')
        .where(filter)
        .first();

};

function findById(id) {
    return db('users')
        .where({ id })
        .first();
};