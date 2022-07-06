const app = require("../../frota-veiculo-apis/app");
const request = require('supertest');


describe('Testes integrados de corrida', () => {
  test('Deverá criar uma corrida', async () => {
    const data = {
      user: '0123456789',
      startPlace: 'Teste',
      finishPlace: 'Teste Final'
    }
    const response = await request(app).post("/api/rides").send(data);

    expect(response.statusCode).toBe(201);
  });
});
