const mockingoose = require('mockingoose');
const model = require('../frota-veiculo-apis/src/models/Users.js');


describe('test mongoose User model', () => {
  it('should return the user', () => {
    const _doc = {
      _id: '507f191e810c19729de860ea',
      name: 'name',
      email: 'name@email.com',
      password: 123432,
      telephone: 963112394
    };

    mockingoose(model).toReturn(_doc, 'findOne');

    return model.findById({ _id: '507f191e810c19729de860ea' }).then(doc => {
      expect(JSON.parse(JSON.stringify(doc))).toMatchObject(_doc);
    });
  });
});


