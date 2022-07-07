const request = require('supertest');
const app = require('../../../app');
const fs = require('mz/fs')
let testFilePath = null;

// const picture = `${__dirname}/img/profile.jpg`;

describe('PUT, /api/v1/user/:id/picture/cloudinary', () => {
  let tokenUser;
  // let falseToken = 'abcdef';
  // let urlPicture = 'https://images.unsplash.com/photo-1628260412297-a3377e45006f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80';

  beforeAll(async () => {
    loginUser = await request(app)
      .post('/api/v1/login')
      .send({
        email: 'lailla@gmail.com',
        password: '123456',
      });
    tokenUser = loginUser.body.token;
    // console.log(loginUser.body)
  })

  // it('Upload image user with status code 200', async () => request(app)
  // .put(`/api/v1/user/${loginUser.body.id}/picture/cloudinary`)
  // .set('Content-Type', 'application/json')
  // .set('Authorization', `Bearer ${tokenUser}`)
  // .send({
  //   image: urlPicture
  // })
  // .then(((res) => {
  //   console.log(res.statusCode)
  //   console.log(res.body)
  // }))


  // it('Successfully uploads jpg image', (done) => {
  //   const req = request(app)
  //     .post(`/api/v1/user/${loginUser.body.id}/picture/cloudinary`)
  //     .set('Authorization', `Bearer ${tokenUser}`)
  //     .set('content-type', 'application/octet-stream')
  //     console.log(req)
  //   const imgStream = fs.createReadStream(picture);
  //     imgStream.on('end', () => req.end(done));
  //     imgStream.pipe(req, {end: false})
  // })



  // test('Successfully uploads jpg image', async () =>
  //   request(app)
  //     .put(`/api/v1/user/${loginUser.body.id}/picture/cloudinary`)
  //     // .set('content-type', 'multipart/form-data')
  //     .set('Authorization', `Bearer ${tokenUser}`)
  //     .attach("picture", picture, { contentType: 'application/octet-stream' })
  //     // .attach({
  //     //   name: 'Lailla',
  //     //   email: 'lailla@gmail.com',
  //     //   city: 'Surabaya',
  //     //   no_tlpn: '081234567890',
  //     //   address: 'Surabaya'
  //     // })
  //     // .attach('image', fs.readFileSync(`${__dirname}/img/profile.jpg`), 'img/profile.jpg')
  //     .field('name', 'Lailla')
  //     .field('email', 'lailla@gmail.com')
  //     .field('no_tlpn', '081234567890')
  //     .field('city', 'Surabaya')
  //     .field('address', 'Surabaya')
  //     // .expect(200)
  //     .then(response => {
  //       expect(response.statusCode).toBe(200);
  //       console.log("response", response);
  //     })
  //     .catch(err => {
  //       console.log(err)
  //     })
  // );



  // )

  // const filePath = `${__dirname}/img/profile.jpg`;

  // // Upload first test file to CDN
  // it('should upload the test file to CDN', () => 
  //   // Test if the test file is exist
  //   fs.exists(filePath)
  //     .then((exists) => {
  //       if (!exists) throw new Error('file does not exist'); 
  //       return request(app)
  //         .post(`/api/v1/user/${loginUser.body.id}/picture/cloudinary`)
  //          // Attach the file with key 'file' which is corresponding to your endpoint setting. 
  //         .attach('file', filePath)
  //         .then((res) => {
  //           const { success, message, filePath } = res.body;
  //           expect(success).toBeTruthy();
  //           expect(message).toBe('Uploaded successfully');
  //           expect(typeof filePath).toBeTruthy();
  //           // store file data for following tests
  //           testFilePath = filePath;
  //         })
  //         .catch(err => console.log(err));
  //     }))


  test('should successfully create new Post and status code 201', (done) => {
    request(app)
      .put(`/api/v1/user/${loginUser.body.id}/picture/cloudinary`)
      .set('Content-Type', 'multipart/form-data')
      .set('Authorization', `Bearer ${tokenUser}`)
      .attach('picture', './img/profile.jpg')
      .field({
        name: 'Lailla',
        email: 'lailla@gmail.com',
        city: 'Surabaya',
        no_tlpn: '081234567890',
        address: 'Surabaya'
      }).then((res) => {
        expect(res.statusCode).toBe(201)
        console.log(res.body)
        // expect(res.body.status).toEqual('success')
        // expect(res.body).toHaveProperty('data')
        done()
      })
      .catch(err => console.log(err));
  });

})