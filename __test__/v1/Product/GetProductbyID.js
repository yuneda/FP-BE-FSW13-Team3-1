const request = require('supertest');
const app = require('../../../app');
const { Product } = require('../../../app/models');

let product;

describe('GET, /api/v1/product', () => {
  beforeAll(async () => {
    product = await Product.create({
      id_user: 1,
      product_name: 'jam_mehong',
      product_price: 1000000,
      category: 'string',
      description: 'JAM AMAHAL BANGET',
      image: null,
      status: 'available',
    });
  });

  afterAll(() => product.destroy());

  it('Add product with status code 201', async () => request(app)
    .get(`/api/v1/product/${product.id}`)
    .set('Accept', 'application/json')
    .then((res) => {
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({
        status: expect.any(String),
        data: expect.any(Object),
      });
    }));
});
