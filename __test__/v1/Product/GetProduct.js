const request = require('supertest');
const app = require('../../../app');
const { Product } = require('../../../app/models')

describe('GET, /api/v1/product', () => {
  let tokenUser;
  let falseToken = 'abcdef';

  // create product + upload file + create history

  it('Add product with status code 201', async () => request(app)
    .get('/api/v1/product')
    .set('Accept', 'application/json')
    .then((res) => {
      expect(res.statusCode).toBe(200);
      console.log(res.statusCode) 
      console.log(res.body)
      expect(res.body).toEqual({
        status : expect.any(String),
        data : expect.any(Object),
        meta : expect.any(Object)
      })
    })
  )
})