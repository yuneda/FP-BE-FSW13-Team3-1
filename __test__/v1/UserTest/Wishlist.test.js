const request = require('supertest');
const app = require('../../../app');
const { Product } = require('../../../app/models');

let tokenUser;
let product;
const falseToken = 'abcdef';

describe('PUT, /api/v1/wishlist', () => {
  beforeAll(async () => {
    const loginUser = await request(app)
      .post('/api/v1/login')
      .send({
        email: 'lailla@gmail.com',
        password: '123456',
      });
    tokenUser = loginUser.body.token;

    product = await Product.create({
      id_user: loginUser.body.id,
      product_name: 'Jam Test',
      product_price: 1000000,
      category: 'string',
      description: 'Hitam',
      image: null,
      status: 'available',
    });
    console.log(product.id);
  });

  afterAll(async () => {
    await Product.destroy({ where: { product_name: 'Jam Test' } });
  });

  it('Add wishlist with status code 200', async () => request(app)
    .put('/api/v1/wishlist')
    .set('Accept', 'application/json')
    .set('Authorization', `Bearer ${tokenUser}`)
    .send({
      id_product: product.id,
    })
    .then((res) => {
      // console.log(res.statusCode)
      // console.log(res.body)
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({
        status: expect.any(String),
        message: expect.any(String),
      });
    }));

  it('Can not add wishlist with status code 401', async () => request(app)
    .put('/api/v1/wishlist')
    .set('Accept', 'application/json')
    .set('Authorization', `Bearer ${falseToken}`)
    .send({
      id_product: product.id,
    })
    .then((res) => {
      expect(res.statusCode).toBe(401);
      expect(res.body).toEqual({
        error: expect.any(String),
        message: expect.any(String),
      });
    }));

  it('Can not add wishlist with status code 422', async () => request(app)
    .put('/api/v1/wishlist')
    .set('Accept', 'application/json')
    .set('Authorization', `Bearer ${tokenUser}`)
    .send({
      id_product: '',
    })
    .then((res) => {
      expect(res.statusCode).toBe(422);
      expect(res.body).toEqual({
        status: expect.any(String),
        message: expect.any(String),
      });
    }));

  it('Delete wishlist with status code 200', async () => request(app)
    .put('/api/v1/deletewishlist')
    .set('Accept', 'application/json')
    .set('Authorization', `Bearer ${tokenUser}`)
    .send({
      id_product: product.id,
    })
    .then((res) => {
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({
        status: expect.any(String),
        message: expect.any(String),
      });
    }));

  it('Delete wishlist with status code 401', async () => request(app)
    .put('/api/v1/deletewishlist')
    .set('Accept', 'application/json')
    .set('Authorization', `Bearer ${falseToken}`)
    .send({
      id_product: product.id,
    })
    .then((res) => {
      expect(res.statusCode).toBe(401);
      expect(res.body).toEqual({
        error: expect.any(String),
        message: expect.any(String),
      });
    }));
});
