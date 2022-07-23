const request = require('supertest');
const app = require('../../../app');
const { Product, History, User } = require('../../../app/models');

const picture = `${__dirname}/img/profile.jpg`;
const picture2 = `${__dirname}/img/jam_tangan.jpg`;

describe('POST, /api/v1/product', () => {
  let tokenUser;
  let falseToken = "abcdef";

  beforeAll(async () => {
    const password = '123456';
    const passwordHash = await require('bcryptjs').hash(password, 10);
    registerUser = await User.create({
      name: 'admin testing',
      email: 'admintesting2@gmail.com',
      password: passwordHash,
    });

    loginUser = await request(app).post('/api/v1/login').send({
      email: 'admintesting2@gmail.com',
      password: '123456',
    });
    tokenUser = loginUser.body.token;
  });

  afterAll(async () => {
    await Product.destroy({ where: { product_name: 'Jam Test' } });
    await History.destroy({ where: { id_seller: loginUser.body.id } });
    await User.destroy({ where: { id: loginUser.body.id } });
  });

  it('Success add product with status code 201', (done) => {
    request(app)
      .post('/api/v1/product')
      .set('content-type', 'application/octet-stream')
      .set('Authorization', `Bearer ${tokenUser}`)
      .attach('files', picture)
      .attach('files', picture2)
      .attach({
        id_user: loginUser.body.id,
        product_name: 'Jam Test',
        product_price: 200000,
        category: 'Aksesoris',
        description: 'Hitam',
        status: 'available',
      })
      .then((response) => {
        expect(response.statusCode).toBe(201);
        done();
      })
      .catch((err) => {
        console.log(err);
      });
  });

  // it('Can not add product with status code 500', (done) => {
  //   request(app)
  //     .post('/api/v1/product')
  //     // .set('content-type', 'application/octet-stream')
  //     .set('Authorization', `Bearer ${tokenUser}`)
  //     // .attach('files', picture)
  //     // .attach('files', picture2)
  //     .attach({
  //       id_user: loginUser.body.id,
  //       product_name: 'Jam Test',
  //       product_price: 200000,
  //       category: 'Aksesoris',
  //       description: 'Hitam',
  //       status: 'available',
  //     })
  //     .then((response) => {
  //       expect(response.statusCode).toBe(500);
  //       done();
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // });
});
