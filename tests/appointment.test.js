const request = require('supertest');
const app = require('../src/app');

describe('Appointment Endpoints', () => {
    let token;

    beforeAll(async () => {
        const response = await request(app)
            .post('/api/v1/login')
            .send({
                email: 'medico@conexa.com',
                senha: '123456',
            });
        token = response.body.token;
    });

    it('should create a new appointment', async () => {
        const response = await request(app)
            .post('/api/v1/appointment')
            .set('Authorization', token)
            .send({
                dataHora: '2030-12-01 09:00:00',
                paciente: {
                    nome: 'João Castro',
                    cpf: '101.202.303-11',
                },
            });
        expect(response.statusCode).toEqual(201);
        expect(response.body).toHaveProperty('id');
    });

    it('should create fail to create an appointment with missing patient data', async () => {
        const response = await request(app)
            .post('/api/v1/appointment')
            .set('Authorization', token)
            .send({
                dataHora: '2030-12-01 09:00:00',
                paciente: {
                    cpf: '101.202.303-11',
                },
            });
        expect(response.statusCode).toEqual(500);
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toEqual('Error creating patient');
    });

    it('should create fail to create an appointment with a past timestamp', async () => {
        const response = await request(app)
            .post('/api/v1/appointment')
            .set('Authorization', token)
            .send({
                dataHora: '2020-12-01 09:00:00',
                paciente: {
                    nome: 'João Castro',
                    cpf: '101.202.303-11',
                },
            });
        expect(response.statusCode).toEqual(400);
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toEqual('Cannot schedule in the past');
    });

    it('should create fail to create an appointment with an invalid timestamp', async () => {
        const response = await request(app)
            .post('/api/v1/appointment')
            .set('Authorization', token)
            .send({
                dataHora: 'invalid-12-01 09:00:00',
                paciente: {
                    nome: 'João Castro',
                    cpf: '101.202.303-11',
                },
            });
        expect(response.statusCode).toEqual(400);
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toEqual('Cannot schedule in the past');
    });
});