const request = require('supertest');
const app = require('../../../app');
const { Product } = require('../../../app/models')

describe('POST, /api/v1/product', () => {
  let tokenUser;
  let falseToken = 'abcdef';

  beforeAll(async () => {
    loginUser = await request(app)
      .post('/api/v1/login')
      .send({
        email: 'lailla@gmail.com',
        password: '123456',
      });
    tokenUser = loginUser.body.token;

    // productTes 
  })

  afterAll(async () => {
    await Product.destroy({ where: { product_name: 'Jam Test' } });
  });

  // create product + upload file + create history

  it('Add product with status code 201', async () => request(app)
    .post('/api/v1/product')
    .set('Accept', 'application/json')
    .set('Authorization', `Bearer ${tokenUser}`)
    .send({
      id_user: loginUser.body.id,
      product_name: 'Jam Test',
      product_price: 200000,
      category: 'Aksesoris',
      description: 'Hitam',
      status: 'available'
    })
    // .send({
    //   id_seller: loginUser.body.id,
    //   id_product: 'Jam Test',
    //   id_offer: null,
    //   id_buyer: null,
    //   status: 'created'
    // })
    .then((res) => {
      console.log(res.statusCode)
      console.log(res.body)
    })
  )
})