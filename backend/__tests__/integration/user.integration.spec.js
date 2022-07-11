const app = require("../../frota-veiculo-apis/app");
const request = require('supertest');
const { faker } = require('@faker-js/faker');

jest.setTimeout(30000);

describe("User", () => {

  it("should create a user", async () => {
    const user = {
      name: faker.name.firstName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      telephone: faker.phone.number()
    }
    const response = await request(app).post("/api/user").send(user);

    expect(response.statusCode).toBe(201);

  });
});
