const request = require('supertest');
const app = require('../../../app');
const { Product } = require('../../../app/models')

describe('GET, /api/v1/product', () => {
  it('Add product with status code 200', async () => request(app)
    .get('/api/v1/product')
    .set('Accept', 'application/json')
    .then((res) => {
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({
        status : expect.any(String),
        data : expect.any(Object),
        meta : expect.any(Object)
      })
    })
  )
})