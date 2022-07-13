const rideService = require('../../frota-veiculo-apis/src/services/RideService');
const mockingoose = require('mockingoose');
const vehicleBusyMock  = require('./mocks/vehicleBusyMock.json');
const userMock  = require('./mocks/userMock.json');
const newRideMock  = require('./mocks/newRideMock.json');
const vehicleAvailableMock  = require('./mocks/vehicleAvailableMock.json');
const rideMock  = require('./mocks/rideMock.json');
const rideStartedMock = require('./mocks/rideStartedMock.json');
const rideFineshedMock = require('./mocks/rideFineshedMock.json');
const rideModel = require("../../frota-veiculo-apis/src/models/Rides");
const vehicleModel = require("../../frota-veiculo-apis/src/models/Vehicles");
const userModel = require("../../frota-veiculo-apis/src/models/Users");

afterEach(() => {
  jest.restoreAllMocks()
});

describe('Teste de Corrida', () => {
  test('Deverá inserir uma corrida', async () => {

    //Mockando o usuario
    mockingoose(userModel).toReturn(userMock, 'findOne');

    //Mockando o veículo
    mockingoose(vehicleModel).toReturn(vehicleAvailableMock, 'findOne');

    //Mockando o veículo para o satus busy
    mockingoose(vehicleModel).toReturn(vehicleBusyMock, 'findOneAndUpdate');

    const response = await rideService.ask(newRideMock.user, newRideMock.startPlace, newRideMock.finishPlace);
    expect(response.statusCode).toBe(201);
    expect(response.data.status).toBe('asked');
    expect(response.data.startPlace).toBe('Teste');
    expect(response.data.finishPlace).toBe('Teste Final');
    expect(response.data.status).toBe('asked');
    expect(JSON.parse(JSON.stringify(response.data.user))).toMatchObject(userMock);
    expect(JSON.parse(JSON.stringify(response.data.vehicle))).toMatchObject(vehicleBusyMock);
  });

  test('Deverá iniciar uma corrida', async () => {
    const status = "start";
    //Mockando o getRides
    mockingoose(rideModel).toReturn(rideMock, 'findOne');
    //mockando o updateStatus

    mockingoose(rideModel).toReturn(rideStartedMock, 'findOneAndUpdate');

    const response = await rideService.updateStatus(rideMock._id, status);
    expect(response.data.status).toBe('started');
    expect(JSON.parse(JSON.stringify(response.data))).toMatchObject(rideStartedMock);
  });

  test('Deverá finalizar uma corrida', async () => {
    const status = "finish";

    //Mockando o getRides
    mockingoose(rideModel).toReturn(rideStartedMock, 'findOne');
    //mockando o updateStatus

    mockingoose(rideModel).toReturn(rideFineshedMock, 'findOneAndUpdate');

    const response = await rideService.updateStatus(rideStartedMock._id, status);
    expect(response.data.status).toBe('finished');
    expect(JSON.parse(JSON.stringify(response.data))).toMatchObject(rideFineshedMock);
  });
});

