const request = require("supertest");
const app = require("../../frota-veiculo-apis/server");

describe("User", () => {

  it("should create a user", async () => {
    const user = {
      name: 'teste',
      email: 'teste@teste.com',
      password: '123456',
      telephone: '999999'
    }
    const response = await request(app).post("/user").send({ user });
    console.log(response.error)

    expect(response.statusCode).toBe(200);
  });


});
