const request = require('supertest');
const app = require('../../../app');

describe('GET, /api/v1/user', () => {
  let tokenUser;
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

  it('Success get data user with status code 200', async () => request(app)
    .get('/api/v1/user')
    .set('Accept', 'application/json')
    .set('Authorization', `Bearer ${tokenUser}`)
    .then((res) => {
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({
        status: expect.any(String),
        data: expect.any(Object),
      });
    }));

  it('Can not get data user with status code 401', async () => request(app)
    .get('/api/v1/user')
    .set('Accept', 'application/json')
    .set('Authorization', `Bearer ${falseToken}`)
    .then((res) => {
      expect(res.statusCode).toBe(401);
      expect(res.body).toEqual({
        error: expect.any(String),
        message: expect.any(String),
      });
    }));

  it('Can not get data user with status code 404', async () => request(app)
    .get('/api/v1/user/9999999999999999999')
    .set('Accept', 'application/json')
    .set('Authorization', `Bearer ${tokenUser}`)
    .then((res) => {
      expect(res.statusCode).toBe(404);
      expect(res.body).toEqual({
        status: expect.any(String),
        message: expect.any(String),
      });
    }));
});
