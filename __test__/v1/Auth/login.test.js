const request = require('supertest');
const bcrypt = require('bcryptjs');
const app = require('../../../app');
const { User } = require('../../../app/models');

describe('Login', () => {
  const emailLogin = 'admin@mail.com';
  const emailNotRegistered = 'custnotregis@mail.com';
  const passwordLogin = '123456';
  const passwordNotRegistered = 'custnotregis';
  const passwordHash = bcrypt.hashSync(passwordLogin, 10);

  
})