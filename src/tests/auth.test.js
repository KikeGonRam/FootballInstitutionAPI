    const request = require('supertest');
    const app = require('../index');

    describe('Auth API', () => {
        it('should register a new user', async () => {
        const res = await request(app)
            .post('/auth/register')
            .send({
            email: 'test@example.com',
            password: 'password123',
            role: 'player',
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('token');
        });

        it('should login a user', async () => {
        const res = await request(app)
            .post('/auth/login')
            .send({
            email: 'test@example.com',
            password: 'password123',
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('token');
        });

        //Nuevo test case agregado 
        it('should register 100 test users efficiently', async () => {
            const promises = Array.from({length: 100}, (_, i) => 
                request(app)
                    .post('/auth/register')
                    .send({
                        email: `test${i}@example.com`,
                        password: `password${i}`,
                        role: i % 2 === 0 ? 'player' : 'coach'
                    })
                    .then(res => {
                        expect(res.statusCode).toEqual(201);
                        expect(res.body).toHaveProperty('token');
                    })
            );
            await Promise.all(promises);
        }, 30000);
    });