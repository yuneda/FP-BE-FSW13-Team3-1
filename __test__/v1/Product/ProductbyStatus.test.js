const request = require('supertest');
const app = require('../../../app');
const { Product, User } = require('../../../app/models');

describe('POST, /api/v1/allproduct', () => {
  let tokenNewUser;
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

    product = await Product.create({
      id_user: loginNewUser.body.id,
      product_name: 'Jam Test',
      product_price: 1000000,
      category: 'string',
      description: 'Hitam',
      image: null,
      status: 'available',
    });
  });

  afterAll(async () => {
    await User.destroy({ where: { id: newUser.id } });
    await Product.destroy({ where: { id: product.id } });
  });

  it('Get product with status code 200', async () => request(app)
    .get('/api/v1/allproduct?status=available')
    .set('Accept', 'application/json')
    .set('Authorization', `Bearer ${tokenNewUser}`)
    .then((res) => {
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({
        status: expect.any(String),
        data: expect.any(Object),
      });
    }));

  it('When does not have product status code 200', async () => request(app)
    .get('/api/v1/allproduct?status=sold')
    .set('Accept', 'application/json')
    .set('Authorization', `Bearer ${tokenNewUser}`)
    .then((res) => {
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({
        status: expect.any(String),
        message: expect.any(String),
      });
    }));
});
