const request = require('supertest');
const app = require('../../../app');
const { User } = require('../../../app/models');

describe('Register', () => {
  afterAll(async () => {
    await User.destroy({ where: { email: 'user@gmail.com' } });
  });

  it('Register with status code 201', () => request(app)
    .post('/api/v1/register')
    .set('Accept', 'application/json')
    .send({
      name: 'user',
      email: 'user@gmail.com',
      password: '123456',
    })
    .then((res) => {
      expect(res.statusCode).toBe(201);
      expect(res.body).toEqual({
        status: expect.any(String),
        message: expect.any(String),
        data: expect.any(Object),
      })
    }))

  it('Register with exciting mail status code 422', () => request(app)
    .post('/api/v1/register')
    .set('Accept', 'application/json')
    .send({
      name: 'user',
      email: 'user@gmail.com',
      password: '123456',
    })
    .then((res) => {
      expect(res.statusCode).toBe(422);
      expect(res.body).toEqual({
        error: {
          message: expect.any(String)
        }
      })
    }))

    it('Register with lengh password error status code 400', () => request(app)
    .post('/api/v1/register')
    .set('Accept', 'application/json')
    .send({
      name: 'user',
      email: 'user@gmail.com',
      password: '123',
    })
    .then((res) => {
      expect(res.statusCode).toBe(400);
      expect(res.body).toEqual({
        error: {
          message: expect.any(String)
        }
      })
    }))

    it('Register with email format error status code 400', () => request(app)
    .post('/api/v1/register')
    .set('Accept', 'application/json')
    .send({
      name: 'user',
      email: 'usergmail.com',
      password: '123456',
    })
    .then((res) => {
      expect(res.statusCode).toBe(400);
      expect(res.body).toEqual({
        error: {
          message: expect.any(String)
        }
      })
    }))
})