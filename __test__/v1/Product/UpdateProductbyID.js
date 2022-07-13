const request = require('supertest');
const app = require('../../../app');
const { Product } = require('../../../app/models')

const picture = `${__dirname}/img/profile.jpg`;
const picture2 = `${__dirname}/img/jam_tangan.jpg`;
let registerUser;
let product;

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
    console.log(loginUser.body)

    product = await Product.create({
      id_user: loginUser.body.id,
      product_name: 'jam test',
      product_price: 1000000,
      category: 'string',
      description: 'JAM AMAHAL BANGET',
      image: null,
      status: 'available'
    })
  })

  afterAll(async () => {
    await Product.destroy({ where: { product_name: 'Jam Test' } });
  });

  it('Update product by id status code 200', function (done) {
    request(app).put(`/api/v1/product/${product.id}/picture/cloudinary`)
      .set('content-type', 'application/octet-stream')
      .set('Authorization', `Bearer ${tokenUser}`)
      .attach('files', picture)
      // .attach('files', picture2)
      .field({
        id_user: loginUser.body.id,
        product_name: 'Jam Test',
        product_price: 200000,
        category: 'Aksesoris',
        description: 'Hitam',
        status: 'available'
      })
      .then(response => {
        expect(response.statusCode).toBe(200);
        done()
      })
      .catch(err => {
        console.log(err)
      })
  })
})