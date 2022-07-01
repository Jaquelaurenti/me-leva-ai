const vehicleService = require('../../frota-veiculo-apis/src/services/VehicleService');
const mockingoose = require('mockingoose');

const vehicleModel = require("../../frota-veiculo-apis/src/models/Vehicles");

afterEach(() => {
  jest.restoreAllMocks()
});


describe("Testes de Veículos", () => {

  test('deverá criar o veículo se o veículo não exisitir na base', async () => {
    const data = {
      model: "Teste Vehicle",
      licensePlate: "tst-2022",
      status: "available"
    };

    const response = await vehicleService.store(data);
    expect(response.data.statusCode).toBe(200);
    expect(response.data.licensePlate).toBe('tst-2022');
    expect(response.data.model).toBe('Teste Vehicle');
    expect(response.data.status).toBe('available');
  });

  test('deverá retornar mensagem de erro ao criar um veículo que já existe na base', async () => {
    const data = {
      _id: "62be28e0b0c2b525674b93f7",
      model: "Teste Vehicle",
      licensePlate: "tst-2022",
      status: "available",
      createdAt: "2022-06-30T22:51:12.792Z"
    };

    //Mockando o usuario
    mockingoose(vehicleModel).toReturn(data, 'findOne');

    const response = await vehicleService.store(data);

    expect(response.statusCode).toBe(404);
    expect(response.data).toBe('Veículo já cadastrado na base');
  });

  test('deverá remover um veículo', async () => {
    const data = {
      _id: "62be28e0b0c2b525674b93f7",
      model: "Teste Vehicle",
      licensePlate: "tst-2022",
      status: "available",
      createdAt: "2022-06-30T22:51:12.792Z"
    };

    //Mockando o veículo
    mockingoose(vehicleModel).toReturn(data, 'findOne');

    // remover o veículo
    const response = await vehicleService.destroy(data);

    expect(response.statusCode).toBe(200);
    expect(response.data).toBe('Veículo deletado com sucesso!');
  });

  test('deverá retornar mensagem de erro ao tentar remover um veículo que não existe na base', async () => {

    const data = {
      _id: "62be28e0b0c2b525674b93f7",
      model: "Teste Vehicle",
      licensePlate: "tst-2022",
      status: "available",
      createdAt: "2022-06-30T22:51:12.792Z"
    };
    //Mockando o null
    mockingoose(vehicleModel).toReturn(null, 'findOne');

    // remover o usuário
    const response = await vehicleService.destroy(data);

    expect(response.statusCode).toBe(404);
    expect(response.data).toBe('Veículo não encontrado!');
  });


  test('deverá retornar os veículos cadastrados na base', async () => {
    const data = {
      _id: "62be28e0b0c2b525674b93f7",
      model: "Teste Vehicle",
      licensePlate: "tst-2022",
      status: "available",
      createdAt: "2022-06-30T22:51:12.792Z"
    };

    mockingoose(vehicleModel).toReturn(data, 'find');

    const response = await vehicleService.index()
    expect(response.statusCode).toBe(200);
  });
});

