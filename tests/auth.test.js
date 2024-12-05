const request = require('supertest');
const app = require('../src/app');

describe('Auth Endpoints', () => {
    it('should signup a new doctor', async () => {
        const response = await request(app)
            .post('/api/v1/signup')
            .send({
                email: 'medico@conexa.com',
                senha: '123456',
                confirmacaoSenha: '123456',
                especialidade: 'Cardiologista',
                cpf: '101.202.303-11',
                dataNascimento: '1980-03-10',
                telefone: '(21) 3232-6565',
            });
        expect(response.statusCode).toEqual(201);
        expect(response.body).toHaveProperty('id');
    });

    it('signup a new doctor should fail with mismatching passwords', async () => {
        const response = await request(app)
            .post('/api/v1/signup')
            .send({
                email: 'medico@conexa.com',
                senha: '123',
                confirmacaoSenha: '123456',
                especialidade: 'Cardiologista',
                cpf: '101.202.303-11',
                dataNascimento: '1980-03-10',
                telefone: '(21) 3232-6565',
            });
        expect(response.statusCode).toEqual(400);
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toEqual('Passwords do not match');
    });

    it('should login an existing doctor', async () => {
        const response = await request(app)
            .post('/api/v1/login')
            .send({
                email: 'medico@conexa.com',
                senha: '123456',
            });
        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty('token');
    });

    it('login an existing doctor with invalid params', async () => {
        const response = await request(app)
            .post('/api/v1/login')
            .send({
                email: 'medico@conexa.com',
                senha: '123',
            });
        expect(response.statusCode).toEqual(401);
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toEqual('Invalid email or password');
    });

    it('validate token by requesting in an authentication required endpoint with invalid token', async () => {
        const response = await request(app)
            .get('/api/v1/logoff')
            .set('Authorization', 'Bearer qualquerUm');

        expect(response.statusCode).toEqual(401);
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toEqual('Failed to authenticate token')
    });

    it('validate token by requesting in an authentication required endpoint without token', async () => {
        const response = await request(app)
            .get('/api/v1/logoff');

        expect(response.statusCode).toEqual(401);
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toEqual('No token provided')
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
        expect(logoffResponse.body.message).toEqual('Logged off successfully')

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
        expect(appointmentResponse.statusCode).toEqual(403)
        expect(logoffResponse.body).toHaveProperty('message');
        expect(logoffResponse.body.message).toEqual('No token provided')
    });
});