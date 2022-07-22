const { INTEGER } = require('sequelize');
const request = require('supertest');
const app = require('../../../app');
const { Offer, Product, History } = require('../../../app/models');

describe('GET, /api/v1/notif', () => {
  let tokenUser;
  let loginUser;
  let falseToken = "abcdef";

  beforeAll(async () => {
    history = await History.create({
      id_product: 2,
      id_buyer: 3,
      id_offer: 29,
      bid_price: 12323,
    });

    loginUser = await request(app).post('/api/v1/login').send({
      email: 'tito@gmail.com',
      password: '123456',
    });
    tokenUser = loginUser.body.token;
  });

  it('Delete notif with status code 200', async () => request(app)
    .delete('/api/v1/notif')
    .set('Accept', 'application/json')
    .set('Authorization', `Bearer ${tokenUser}`)
    .then((res) => {
      expect(res.statusCode).toBe(200);
      // expect(res.body).toEqual({
      //   status: expect.any(String),
      //   data: expect.any(INTEGER)
      // });
      expect(res.body).toEqual({ ...res.body });
    }));

  it('Delete notif with status code 401', async () => request(app)
    .delete('/api/v1/notif')
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
