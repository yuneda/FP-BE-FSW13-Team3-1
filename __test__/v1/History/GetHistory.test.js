const request = require('supertest');
const app = require('../../../app');
const { Offer, Product, History } = require('../../../app/models');

describe('GET, /api/v1/history', () => {
  let tokenUser;
  let product;
  let loginBuyer;

  beforeAll(async () => {
    history = await History.create({
      id_product: 2,
      id_buyer: 3,
      id_offer: 29,
      bid_price: 12323,
    });

    product = await Offer.create({
      id_user: 1,
      product_name: 'jam_mehong',
      product_price: 1000000,
      category: 'string',
      description: 'JAM AMAHAL BANGET',
      image: null,
      status: 'available',
    });

    loginBuyer = await request(app).post('/api/v1/history').send({
      email: 'lailla@gmail.com',
      password: '123456',
    });
    tokenUser = loginBuyer.body.token;
  });

  afterAll(async () => {
    await Offer.destroy({ where: { id_product: product.id } });
    await Product.destroy({ where: { id: product.id } });
    await History.destroy({ where: { id_offer: product.id } });
  });

  it('Add history with status code 201', async () => request(app)
    .get(`/api/v1/history/${product.id}`)
    .set('Accept', 'application/json')
    .set('Authorization', `Bearer ${tokenUser}`)
    .then((res) => {
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({
        status: expect.any(String),
        data: expect.any(Object),
      });
    }));
});
