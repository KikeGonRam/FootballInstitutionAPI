const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../index');
const Country = require('../models/Country');
const City = require('../models/City');
const Team = require('../models/Team');

let token, teamId;

beforeAll(async () => {
    // Conectar a la base de datos de prueba
    await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    // Crear un usuario admin para obtener un token
    const res = await request(app)
        .post('/auth/register')
        .send({
        email: 'admin@test.com',
        password: 'password123',
        role: 'admin',
        });
    token = res.body.token;

    // Crear un país, ciudad y equipo para las pruebas
    const country = await new Country({ name: 'País Test', image: 'https://example.com/flag.png' }).save();
    const city = await new City({ name: 'Ciudad Test', country: country._id }).save();
    const team = await new Team({ name: 'Equipo Test', city: city._id, image: 'https://example.com/team.png' }).save();
    teamId = team._id;
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe('Coach API', () => {
    it('should create a coach', async () => {
        const res = await request(app)
        .post('/coaches')
        .set('Authorization', `Bearer ${token}`)
        .send({
            name: 'Entrenador Test',
            team: teamId,
            image: 'https://example.com/coach.png',
            license: 'Licencia A',
        });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('_id');
    });

    it('should get all coaches', async () => {
        const res = await request(app).get('/coaches');
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBe(true);
    });
});

describe('Referee API', () => {
    it('should create a referee', async () => {
        const res = await request(app)
        .post('/referees')
        .set('Authorization', `Bearer ${token}`)
        .send({
            name: 'Árbitro Test',
            image: 'https://example.com/referee.png',
            certification: 'Certificación FIFA',
        });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('_id');
    });

    it('should get all referees', async () => {
        const res = await request(app).get('/referees');
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBe(true);
    });
});

describe('Assistant API', () => {
    it('should create an assistant', async () => {
        const res = await request(app)
        .post('/assistants')
        .set('Authorization', `Bearer ${token}`)
        .send({
            name: 'Auxiliar Test',
            team: teamId,
            image: 'https://example.com/assistant.png',
            role: 'Preparador físico',
        });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('_id');
    });

    it('should get all assistants', async () => {
        const res = await request(app).get('/assistants');
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBe(true);
    });
});

describe('Executive API', () => {
    it('should create an executive', async () => {
        const res = await request(app)
        .post('/executives')
        .set('Authorization', `Bearer ${token}`)
        .send({
            name: 'Directivo Test',
            team: teamId,
            image: 'https://example.com/executive.png',
            position: 'Presidente',
        });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('_id');
    });

    it('should get all executives', async () => {
        const res = await request(app).get('/executives');
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

});

describe('Massive Data Insertion', () => {
    it('should create 10,000 test records through API', async () => {
        const totalRecords = 10000;
        const batchSize = 100; // Procesar en lotes para no sobrecargar la API
        const batches = Math.ceil(totalRecords / batchSize);

        for (let batch = 0; batch < batches; batch++) {
            const promises = [];

            // Crear lotes de coaches
            for (let i = 0; i < batchSize && (batch * batchSize + i) < totalRecords; i++) {
                const recordNum = batch * batchSize + i;
                promises.push(
                    request(app)
                        .post('/coaches')
                        .set('Authorization', `Bearer ${token}`)
                        .send({
                            name: `Coach Test ${recordNum}`,
                            team: teamId,
                            image: `https://example.com/coach${recordNum}.png`,
                            license: `License-${recordNum}`
                        })
                );

                // Crear lotes de referees
                promises.push(
                    request(app)
                        .post('/referees')
                        .set('Authorization', `Bearer ${token}`)
                        .send({
                            name: `Referee Test ${recordNum}`,
                            image: `https://example.com/referee${recordNum}.png`,
                            certification: `Certification-${recordNum}`
                        })
                );

                // Crear lotes de assistants
                promises.push(
                    request(app)
                        .post('/assistants')
                        .set('Authorization', `Bearer ${token}`)
                        .send({
                            name: `Assistant Test ${recordNum}`,
                            team: teamId,
                            image: `https://example.com/assistant${recordNum}.png`,
                            role: `Role-${recordNum}`
                        })
                );

                // Crear lotes de executives
                promises.push(
                    request(app)
                        .post('/executives')
                        .set('Authorization', `Bearer ${token}`)
                        .send({
                            name: `Executive Test ${recordNum}`,
                            team: teamId,
                            image: `https://example.com/executive${recordNum}.png`,
                            position: `Position-${recordNum}`
                        })
                );
            }

            // Ejecutar el lote actual
            await Promise.all(promises);
            console.log(`Batch ${batch + 1}/${batches} completed - ${(batch + 1) * batchSize * 4} records inserted`);
        }

        // Verificar los conteos finales
        const coachesRes = await request(app).get('/coaches');
        const refereesRes = await request(app).get('/referees');
        const assistantsRes = await request(app).get('/assistants');
        const executivesRes = await request(app).get('/executives');

        expect(coachesRes.body.length).toBeGreaterThanOrEqual(totalRecords);
        expect(refereesRes.body.length).toBeGreaterThanOrEqual(totalRecords);
        expect(assistantsRes.body.length).toBeGreaterThanOrEqual(totalRecords);
        expect(executivesRes.body.length).toBeGreaterThanOrEqual(totalRecords);
    }, 600000); // Timeout extendido a 10 minutos para esta prueba
});
