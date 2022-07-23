const request = require('supertest');
const app = require('../../../app');

const picture = `${__dirname}/img/profile.jpg`;
const pdf = `${__dirname}/img/file.pdf`;
const empty = '';

describe('PUT, /api/v1/user/:id/picture/cloudinary', () => {
  let tokenUser;
  const falseToken = 'abcdef';

  beforeAll(async () => {
    loginUser = await request(app)
      .post('/api/v1/login')
      .send({
        email: 'lailla@gmail.com',
        password: '123456',
      });
    tokenUser = loginUser.body.token;
  });

  test('Successfully uploads jpg image status code 200', async () => request(app)
    .put(`/api/v1/user/${loginUser.body.id}/picture/cloudinary`)
    .set('content-type', 'application/octet-stream')
    .set('Authorization', `Bearer ${tokenUser}`)
    .attach('picture', picture)
    .field({
      name: 'Lailla',
      email: 'lailla@gmail.com',
      no_tlpn: '081234567890',
      city: 'Surabaya',
      address: 'Surabaya',
    })
    .expect(200)
    .catch((err) => {
      console.log(err);
    }));

  test('Can not uploads jpg image status code 400', async () => request(app)
    .put(`/api/v1/user/${loginUser.body.id}/picture/cloudinary`)
    .set('content-type', 'application/octet-stream')
    .set('Authorization', `Bearer ${tokenUser}`)
    .attach('picture', empty)
    .field({
      name: 'Lailla',
      email: 'lailla@gmail.com',
      no_tlpn: '081234567890',
      city: 'Surabaya',
      address: 'Surabaya',
    })
    .expect(400)
    .catch((err) => {
      console.log(err);
    }));

    test('Can not uploads jpg image status code 400', async () => request(app)
    .put(`/api/v1/user/${loginUser.body.id}/picture/cloudinary`)
    .set('content-type', 'application/octet-stream')
    .set('Authorization', `Bearer ${tokenUser}`)
    .attach('picture', pdf)
    .field({
      name: 'Lailla',
      email: 'lailla@gmail.com',
      no_tlpn: '081234567890',
      city: 'Surabaya',
      address: 'Surabaya',
    })
    .expect(400)
    .catch((err) => {
      console.log(err);
    }));

  test('Can not uploads jpg image status code 401', async () => request(app)
    .put(`/api/v1/user/${loginUser.body.id}/picture/cloudinary`)
    .set('Authorization', `Bearer ${falseToken}`)
    .attach('picture', picture)
    .field({
      name: 'Lailla',
      email: 'lailla@gmail.com',
      no_tlpn: '081234567890',
      city: 'Surabaya',
      address: 'Surabaya',
    })
    .expect(401)
    .catch((err) => {
      console.log(err);
    }));

  test('Successfully uploads jpg image status code 500', async () => request(app)
    .put(`/api/v1/user/${loginUser.body.id}/picture/cloudinary`)
    .set('Authorization', `Bearer ${tokenUser}`)
    .field({
      name: 'Lailla',
      email: 'lailla@gmail.com',
      no_tlpn: '081234567890',
      city: 'Surabaya',
      address: 'Surabaya',
    })
    .expect(500)
    .catch((err) => {
      console.log(err);
    }));
});
