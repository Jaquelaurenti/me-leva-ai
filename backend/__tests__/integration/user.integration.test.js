const app = require("../../frota-veiculo-apis/server");
const supertest = require('supertest');
const request = supertest(app);

describe("User", () => {

  it("should create a user", async () => {
    const user = {
      name: 'teste',
      email: 'teste@teste.com',
      password: '123456',
      telephone: '999999'
    }
    const response = await request.post("/user").send({ user });

    expect(response.statusCode).toBe(200);

  });
});
