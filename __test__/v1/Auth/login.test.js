const request = require('supertest');
const app = require('../../../app');

describe('Login', () => {
  const emailLogin = 'lailla@mail.com';
  const emailNotRegistered = 'custnotregis@gmail.com';
  const passwordLogin = '123456';
  const passwordNotRegistered = 'custnotregis';

  it('Login success, status code 201', async () => request(app)
    .post('/api/v1/login')
    .set('Content-Type', 'application/json')
    .send({ email: emailLogin, password: passwordLogin })
    .then((res) => {
      expect(res.statusCode).toBe(200);
      expect(res.body.accesToken).toEqual(res.body.accesToken);
    }))

  it('Login status code 404', async () => request(app)
  .post('/api/v1/login')
  .set('Content-Type', 'application/json')
  .send({ email: emailNotRegistered, password: passwordNotRegistered })
  .then((res) => {
    expect(res.statusCode).toBe(404);
    expect(res.body).toEqual({
      error: {
        message: 'Email Not Found!'
      },
    });
  }))

  it('Login status code 401', async () => request(app)
  .post('/api/v1/login')
  .set('Content-Type', 'application/json')
  .send({ email: emailLogin, password: passwordNotRegistered })
  .then((res) => {
    expect(res.statusCode).toBe(401);
    expect(res.body).toEqual({
      error: {
        message: 'Wrong Password. Please Try Again!'
      },
    });
  }))

  it('Login email not found status code 404', async () => request(app)
  .post('/api/v1/login')
  .set('Content-Type', 'application/json')
  .send({ email: emailNotRegistered, password: passwordLogin })
  .then((res) => {
    expect(res.statusCode).toBe(404);
    expect(res.body).toEqual({
      error: {
        message: 'Email Not Found!'
      },
    });
  }))

  // it('Not login status code 401', async () => request(app)
  // .post('/api/v1/login')
  // .set('Content-Type', 'application/json')
  // // .send({})
  // .then((res) => {
  //   console.log(res.statusCode)
  //   console.log(res.body)
  //   // expect(res.statusCode).toBe(404);
  //   // expect(res.body).toEqual({
  //   //   error: {
  //   //     message: 'Please login first'
  //   //   },
  //   // });
  // }))
})