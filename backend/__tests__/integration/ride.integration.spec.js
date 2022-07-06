const app = require("../../frota-veiculo-apis/app");
const request = require('supertest');
const jwt = require('jsonwebtoken');

require("dotenv").config({
  path: process.env.NODE_ENV === "test" ? ".env.test" : ".env"
});

const mockToken = (user) => {
  return jwt.sign({ user }, process.env.SECRET_KEY, {
    expiresIn: 3000
  });
}


describe('Testes integrados de corrida', () => {
  test('Deverá criar uma corrida', async () => {
    const data = {
      user: '0123456789',
      startPlace: 'Teste',
      finishPlace: 'Teste Final'
    }

    const user = {
      name: 'teste',
      email: 'teste@teste.com',
      password: '123456',
      telephone: '0123456789'
    }
    const token = mockToken(user);
    const headers = {
      "x-access-token": token
    }
    const response = await request(app).post("/api/rides").set(headers).send(data);
    console.log(response)
    expect(response.statusCode).toBe(201);
  });
});
