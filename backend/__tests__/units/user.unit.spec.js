const userService = require('../../frota-veiculo-apis/src/services/UserService');
const mockingoose = require('mockingoose');

const UserModel = require("../../frota-veiculo-apis/src/models/Users");
const userMock  = require('./mocks/userMock.json');
const newUserMock = require('./mocks/newUserMock.json');

afterEach(() => {
  jest.restoreAllMocks()
});


describe("Testes de Usuário", () => {

  test('deverá criar o cliente se o usuário não exisitir na base', async () => {

    // Forçando o retorno null quando realizar um findOne
    mockingoose(UserModel).toReturn(null, 'findOne');

    // Se eu fosse criar diretamente no banco sem passar pela service
    //mockingoose(UserModel).toReturn(userParam, 'create')

    const userResponse = await userService.store(newUserMock);
    expect(userResponse.statusCode).toBe(201);
    expect(userResponse.data.name).toBe('teste');
    expect(userResponse.data.email).toBe('teste@teste.com');
    expect(userResponse.data.telephone).toBe('0123456789');
  });

  test('deverá retornar mensagem de erro ao criar um usuário que já existe na base', async () => {

    //Mockando o usuario
    mockingoose(UserModel).toReturn(userMock, 'findOne');


    // Nao printo o password por que ele é dinamico
    const userResponse = await userService.store(userMock);

    expect(userResponse.statusCode).toBe(406);
    expect(userResponse.data).toBe('Usuário já cadastrado!');
  });

  test('deverá remover um usuário', async () => {
    //Mockando o usuario
    mockingoose(UserModel).toReturn(userMock, 'findOne');

    // remover o usuário
    const userResponse = await userService.destroy(userMock.telephone);

    expect(userResponse.statusCode).toBe(200);
    expect(userResponse.data).toBe('Usuário deletado com sucesso!');
  });

  test('deverá retornar mensagem de erro ao tentar remover um usuário que não existe na base', async () => {

    //Mockando o null
    mockingoose(UserModel).toReturn(null, 'findOne');

    // remover o usuário
    const userResponse = await userService.destroy(userMock);

    expect(userResponse.statusCode).toBe(400);
    expect(userResponse.data).toBe('Usuário não cadastrado!');
  });


  test('deverá retornar os usuários cadastrados na base', async () => {
    const userParam = {
      _id: "62b8df3b85371c1b1502e791",
      name: 'teste',
      email: 'teste@teste.com',
      password: '123456',
      telephone: '0123456789'
    }
    //Mockando os usuarios
    mockingoose(UserModel).toReturn(userParam, 'find');

    // remover o usuário
    const userResponse = await userService.index();

    expect(userResponse.statusCode).toBe(200);
  });
});

