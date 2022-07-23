const request = require('supertest');
const app = require('../../../app');

describe('GET, /api/v1/product', () => {
  it('Get product with status code 200', async () => request(app)
    .get('/api/v1/product')
    .set('Accept', 'application/json')
    .then((res) => {
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({
        status: expect.any(String),
        data: expect.any(Object),
        meta: expect.any(Object),
      });
    }));

  it('Get product by category with status code 200', async () => request(app)
    .get('/api/v1/product?filter=Kendaraan')
    .set('Accept', 'application/json')
    .then((res) => {
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({
        status: expect.any(String),
        data: expect.any(Object),
        meta: expect.any(Object),
      });
    }));
});
