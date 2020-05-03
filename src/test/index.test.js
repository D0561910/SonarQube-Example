const request = require('supertest')
const server = require('../index')

describe('Get Endpoints', () => {
    it('Get', async () => {
        const res = await request(server)
            .get('/')
            .send({
                userId: 1,
                title: 'test is cool',
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('nome');
        // done();
    })
});

describe('Get /api', () => {
    it('/api', async (done) => {
        var res = await (await request(server).get('/api'));
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('message');
        done();
    });
});

describe('Post /api/login', () => {
    it('login status', async () => {
        const res = await request(server)
            .post('/api/login')
            .send({
                username: "test",
                email: "test@gmail.com"
            });
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('token');
    });
});

afterAll(async done => {
    // close server conection
    server.close();
    done();
});