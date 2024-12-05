const request = require('supertest');
const app = require('../src/app');

describe('Auth Endpoints', () => {
    const signupData = [
        ['should signup a new doctor', {
            email: 'medico@conexa.com',
            senha: '123456',
            confirmacaoSenha: '123456',
            especialidade: 'Cardiologista',
            cpf: '101.202.303-11',
            dataNascimento: '1980-03-10',
            telefone: '(21) 3232-6565',
        }, 201, 'id', null],
        ['signup a new doctor should fail with mismatching passwords', {
            email: 'medico@conexa.com',
            senha: '123',
            confirmacaoSenha: '123456',
            especialidade: 'Cardiologista',
            cpf: '101.202.303-11',
            dataNascimento: '1980-03-10',
            telefone: '(21) 3232-6565',
        }, 400, 'message', 'Passwords do not match'],
    ];

    test.each(signupData)('%s', async (description, payload, expectedStatus, expectedProperty, expectedMessage) => {
        const response = await request(app)
            .post('/api/v1/signup')
            .send(payload);
        expect(response.statusCode).toEqual(expectedStatus);
        expect(response.body).toHaveProperty(expectedProperty);
        if (expectedMessage) {
            expect(response.body.message).toEqual(expectedMessage);
        }
    });

    const loginData = [
        ['should login an existing doctor', {
            email: 'medico@conexa.com',
            senha: '123456',
        }, 200, 'token', null],
        ['login an existing doctor with invalid params', {
            email: 'medico@conexa.com',
            senha: '123',
        }, 401, 'message', 'Invalid email or password'],
    ];

    test.each(loginData)('%s', async (description, payload, expectedStatus, expectedProperty, expectedMessage) => {
        const response = await request(app)
            .post('/api/v1/login')
            .send(payload);
        expect(response.statusCode).toEqual(expectedStatus);
        expect(response.body).toHaveProperty(expectedProperty);
        if (expectedMessage) {
            expect(response.body.message).toEqual(expectedMessage);
        }
    });

    const tokenValidationData = [
        ['validate token by requesting in an authentication required endpoint with invalid token', 'anything', 401, 'message', 'Failed to authenticate token'],
        ['validate token by requesting in an authentication required endpoint without token', '', 401, 'message', 'No token provided'],
    ];

    test.each(tokenValidationData)('%s', async (description, token, expectedStatus, expectedProperty, expectedMessage) => {
        const response = await request(app)
            .get('/api/v1/logoff')
            .set('Authorization', token);
        expect(response.statusCode).toEqual(expectedStatus);
        expect(response.body).toHaveProperty(expectedProperty);
        expect(response.body.message).toEqual(expectedMessage);
    });

    it('should logoff a logged in doctor', async () => {
        const authResponse = await request(app)
            .post('/api/v1/login')
            .send({
                email: 'medico@conexa.com',
                senha: '123456',
            });
        const token = authResponse.body.token;

        const logoffResponse = await request(app)
            .get('/api/v1/logoff')
            .set('Authorization', token);

        expect(logoffResponse.statusCode).toEqual(200);
        expect(logoffResponse.body).toHaveProperty('message');
        expect(logoffResponse.body.message).toEqual('Logged off successfully');

        const appointmentResponse = await request(app)
            .post('/api/v1/appointment')
            .set('Authorization', token)
            .send({
                dataHora: '2030-12-01 09:00:00',
                paciente: {
                    nome: 'João Castro',
                    cpf: '101.202.303-11',
                },
            });
        expect(appointmentResponse.statusCode).toEqual(401);
        expect(appointmentResponse.body).toHaveProperty('message');
        expect(appointmentResponse.body.message).toEqual('Token is blacklisted');
    });
});