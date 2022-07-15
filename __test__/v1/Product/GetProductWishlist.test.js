const request = require('supertest');
const app = require('../../../app');

describe('GET, /api/v1/product', () => {
  const falseToken = 'abcdef';

  beforeAll(async () => {
    const loginUser = await request(app)
      .post('/api/v1/login')
      .send({
        email: 'lailla@gmail.com',
        password: '123456',
      });
    tokenUser = loginUser.body.token;
  });

  it('Get product with status code 200', async () => request(app)
    .get('/api/v1/productWishlist')
    .set('Accept', 'application/json')
    .set('Authorization', `Bearer ${tokenUser}`)
    .then((res) => {
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({
        status: expect.any(String),
        data: expect.any(Object),
      });
    }));

  it('Get product with status code 401', async () => request(app)
    .get('/api/v1/productWishlist')
    .set('Accept', 'application/json')
    .set('Authorization', `Bearer ${falseToken}`)
    .then((res) => {
      expect(res.statusCode).toBe(401);
      expect(res.body).toEqual({
        error: expect.any(String),
        message: expect.any(String),
      });
    }));
});
