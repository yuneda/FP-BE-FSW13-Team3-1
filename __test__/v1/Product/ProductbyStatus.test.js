const request = require('supertest');
const app = require('../../../app');
const { Product, User } = require('../../../app/models');

describe('POST, /api/v1/allproduct', () => {
  let tokenUser;
  let product;

  beforeAll(async () => {
    const password = '123456';
    const passwordHash = await require('bcryptjs').hash(password, 10);
    newUser = await User.create({
      name: 'New User',
      email: 'newusertes1@gmail.com',
      password: passwordHash,
    });

    const loginNewUser = await request(app)
      .post('/api/v1/login')
      .send({
        email: 'newusertes1@gmail.com',
        password: '123456',
      });
    tokenNewUser = loginNewUser.body.token;
    console.log(loginNewUser.body);

    const loginUser = await request(app)
      .post('/api/v1/login')
      .send({
        email: 'lailla@gmail.com',
        password: '123456',
      });
    tokenUser = loginUser.body.token;

    product = await Product.create({
      id_user: 1,
      product_name: 'jam_mehong',
      product_price: 1000000,
      category: 'string',
      description: 'JAM AMAHAL BANGET',
      image: null,
      status: 'available',
    });
    console.log(product.id);
  });

  afterAll(async () => {
    await User.destroy({ where: { id: newUser.id } });
    await Product.destroy({ where: { id: product.id } });
  });

  it('Get product with status code 200', async () => request(app)
    .post('/api/v1/allproduct')
    .set('Accept', 'application/json')
    .set('Authorization', `Bearer ${tokenUser}`)
    .send({
      status: 'available',
    })
    .then((res) => {
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({
        status: expect.any(String),
        data: expect.any(Object),
      });
    }));

  it('Get product with status code 200', async () => request(app)
    .post('/api/v1/allproduct')
    .set('Accept', 'application/json')
    .set('Authorization', `Bearer ${tokenUser}`)
    .send({
      status: 'sold',
    })
    .then((res) => {
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({
        status: expect.any(String),
        data: expect.any(Object),
      });
    }));

  it('New user get product with status code 200', async () => request(app)
    .post('/api/v1/allproduct')
    .set('Accept', 'application/json')
    .set('Authorization', `Bearer ${tokenNewUser}`)
    .send({
      status: 'available',
    })
    .then((res) => {
      expect(res.statusCode).toBe(200);
      console.log(res.body);
      // expect(res.body).toEqual({
      //   status: expect.any(String),
      //   data: expect.any(Object),
      // });
    }));
});
