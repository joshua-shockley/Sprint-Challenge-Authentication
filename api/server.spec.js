const server = require('./server.js');
const request = require('supertest');

describe('is env testing', () => {
    it('is it in testing env', () => {
        expect(process.env.DB_ENV).toBe('testing');
    })
});

describe('test should come back as json', () => {
    it('returns a json type message', () => {
        return request(server).get('/')
            .then(response => {
                expect(response.type).toMatch(/json/i);
            })
    });

    it('gives 200 code when good', () => {
        return request(server).get('/')
            .then(response => {
                expect(response.status).toEqual(200);
            })
    });


});

describe('test should come back with 200 code', () => {
    it('gives 200 code when good', () => {
        return request(server).get('/')
            .then(response => {
                expect(response.body.hello).toBe(' can you see this?');
            })
    });
});

describe('test should have 200 code when it works', () => {
    it('gives proper code', () => {
        return request(server).post('/api/auth/register')
            .send({ username: "dude", password: "password" })
            .set('accept', 'application/json')
            .expect('Content-Type', /json/i);
        // .then(response => {
        //     expect(response.status).toBe(200);
        // })
    });
    it('returns some of user data upon completion', () => {
        return request(server).post('/api/auth/register')
            .send({ username: "coolio", password: 'password' })
            .set('accept', 'application/json')
            .then(response => {
                expect(response.type).toMatch(/json/i);
            })
    })

});

describe('testing login', () => {
    it('returns json type object', () => {
        return request(server).post('/api/auth/login')
            .send({ username: 'coolio', password: 'password' })
            .set('accept', 'application/json')
            .then(response => {
                expect(response.type).toMatch(/json/i);
            })
    })
    it('returns code 200 on success', () => {
        return request(server).post('/api/auth/login')
            .send({ username: 'coolio', password: 'password' })
            .set('accept', 'application/json')
            .then(response => {
                expect(response.status).toBe(200);
            })
    })
})