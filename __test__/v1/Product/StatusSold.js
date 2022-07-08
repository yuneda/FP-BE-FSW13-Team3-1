const request = require('supertest');
const app = require('../../../app');
const { Product } = require('../../../app/models')


describe('PUT, /api/v1/product/:id/statussold', () => {
  let tokenUser;
  let falseToken = 'abcdef';
  let product;

  beforeAll(async () => {
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
      status: 'available'
    })
  })

  afterAll(() => product.destroy())

  it('Add product with status code 200', async () => request(app)
    .put(`/api/v1/product/${product.id}/statussold`)
    .set('Accept', 'application/json')
    .set('Authorization', `Bearer ${tokenUser}`)
    .then((res) => {
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({
        status: expect.any(String),
        message: expect.any(String),
      })
    })
  )
})