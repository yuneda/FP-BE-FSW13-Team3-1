const request = require('supertest');
const app = require('../../../app');
const { Product } = require('../../../app/models')
let product;

describe('POST, /api/v1/product/search', () => {
  beforeAll(async() =>{
    product = await Product.create({
      id_user : 1,
      product_name : 'jam test',
      product_price : 1000000,
      category : 'string',
      description : 'JAM AMAHAL BANGET',
      image : null,
      status : 'available'
    })
  })

  afterAll(() => product.destroy())

  it('Search product with status code 200', async () => request(app)
    .post(`/api/v1/product/search?name=${product.product_name}`)
    .set('Accept', 'application/json')
    .then((res) => {
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({
        status: expect.any(String),
        data: expect.any(Object),
        meta: expect.any(Object)
      })
    })
  )
})