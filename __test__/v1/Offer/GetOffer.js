const request = require('supertest');
const app = require('../../../app');
const { Offer, Product } = require('../../../app/models');

describe('GET, /api/v1/offer', () => {
  let tokenUser;
  let product;
  let loginBuyer;

  beforeAll(async () => {
    product = await Offer.create({
      id_user: 1,
      product_name: 'jam_mehong',
      product_price: 1000000,
      category: 'string',
      description: 'JAM AMAHAL BANGET',
      image: null,
      status: 'available',
    });

    loginBuyer = await request(app).post('/api/v1/login').send({
      email: 'lailla@gmail.com',
      password: '123456',
    });
    tokenUser = loginBuyer.body.token;
  });

  afterAll(async () => {
    await Offer.destroy({ where: { id_product: product.id } });
    await Product.destroy({ where: { id: product.id } });
  });

  it('Add offer with status code 201', async () => request(app)
    .get('/api/v1/offer')
    .set('Accept', 'application/json')
    .set('Authorization', `Bearer ${tokenUser}`)
    .then((res) => {
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({
        status: expect.any(String),
        data: expect.any(Object),
        meta: expect.any(Object),
      });
    }));
});
