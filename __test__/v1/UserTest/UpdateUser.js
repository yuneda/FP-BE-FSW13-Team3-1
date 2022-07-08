const request = require('supertest');
const app = require('../../../app');

describe('PUT, /api/v1/user', () => {
  let tokenUser;
  let falseToken = 'abcdef';

  beforeAll(async () => {
    const loginUser = await request(app)
      .post('/api/v1/login')
      .send({
        email: 'lailla@gmail.com',
        password: '123456',
      });
    tokenUser = loginUser.body.token;
  })

  it('Update data user with status code 200', async () => request(app)
    .put('/api/v1/user')
    .set('Accept', 'application/json')
    .set('Authorization', `Bearer ${tokenUser}`)
    .send({
      city: 'Surabaya'
    })
    .then((res) => {
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({
        status: expect.any(String),
        message: expect.any(String)
      });
    })
  )

  it('Update data user with status code 401', async () => request(app)
    .put('/api/v1/user')
    .set('Accept', 'application/json')
    .set('Authorization', `Bearer ${falseToken}`)
    .send({
      city: 'Surabaya'
    })
    .then((res) => {
      expect(res.statusCode).toBe(401);
      expect(res.body).toEqual({
        error: expect.any(String),
        message: expect.any(String)
      });
    })
  )

  // it('Update data user with status code 422', async () => request(app)
  //   .put('/api/v1/user')
  //   .set('Accept', 'application/json')
  //   .set('Authorization', `Bearer ${tokenUser}`)
  //   .send({
  //     city: 'Surabaya'
  //   })
  //   .then((res) => {
  //     console.log(res.statusCode)
  //     console.log(res.body)
  //     // expect(res.statusCode).toBe(422);
  //     // expect(res.body).toEqual({
  //     //   status: expect.any(String),
  //     //   message: expect.any(String)
  //     // });
  //   })
  // )
})