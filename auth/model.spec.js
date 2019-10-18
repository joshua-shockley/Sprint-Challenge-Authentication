const db = require('../database/dbConfig');

const Users = require('./Auth-Model.js');

describe('in proper env still', () => {
    it('correct env is testing', () => {
        expect(process.env.DB_ENV).toBe('testing');
    })
});


describe('authModel', () => {
    beforeEach(async() => {
        await db('users').truncate();
    })

    describe('testing db starts at 0', () => {
        it('are there anyone in there?', async() => {
            let list = await db('users')
            expect(list).toHaveLength(0);
        })
    });
})
describe('add/post is working', () => {
    it('is it posting to database', async() => {
        //now lets add one and check again
        await Users.add({ username: 'kyle', password: 'password' });
        const list = await db('users');
        expect(list).toHaveLength(1);

    })
});

describe('findBy finds what we added above', () => {
    it('finds username', async() => {
        let user = await db('users');

        await Users.findBy({ username: 'kyle' })
            .then(response => {
                console.log(response);
                expect(response.username).toMatch(/kyle/i)
            });

    })
    it('finds userId in', async() => {
        let user = await db('users');
        await Users.findBy({ username: 'kyle' })
            .then(response => {
                console.log(response);
                expect(response.id).toBe(1);
            })
    })
})

describe('finds by the Id', () => {
    it('should find kyle by his id', async() => {
        let user = await db('users');
        let id = 1;
        await Users.findById(id)
            .then(response => {
                console.log(response);
                expect(response.username).toBe('kyle');
            })
    });

    it('should fail when no id exists ', async() => {
        let user = await db('users');
        let id = 6;
        await Users.findById(id)
            .then(response => {
                expect(response).toBe(undefined);
            })
    })
})