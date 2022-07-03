const request = require('supertest');
const bcrypt = require('bcryptjs');
const app = require('../../../app');
// const { User } = require('../../../app/models');

describe('Login', () => {
  const emailLogin = 'admin@mail.com';
  // const emailNotRegistered = 'custnotregis@mail.com';
  const passwordLogin = '123456';
  // const passwordNotRegistered = 'custnotregis';
  const passwordHash = bcrypt.hashSync(passwordLogin, 10);

  // beforeEach(async () => {
  //   await User.create(customer);
  //   const user = await User.findOne({ where: { email: emailNotRegistered } });

  //   if (user != null) {
  //     await user.destroy({ where: { email: emailNotRegistered } });
  //   }
  // });

  // afterEach(async () => {
  //   const user = await User.findOne({ where: { email: emailLogin } });
  //   await user.destroy({ where: { email: emailLogin } });
  // });

  it('Login success, status code 201', async () => request(app)
    .post('/v1/api/login')
    .set('Content-Type', 'application/json')
    .send({ email: emailLogin, password: passwordHash })
    .then((res) => {
      expect(res.statusCode).toBe(201);
      expect(res.body.accesToken).toEqual(res.body.accesToken);
    })
  )
})