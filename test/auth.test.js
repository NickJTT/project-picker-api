import { expect } from 'chai';
import request from './helpers/request';

const URL = 'auth';

describe(URL, () => {
  let token;
  const data = { username: 'Test Username', password: 'Test Password' };

  describe('POST', () => {
    it(`${URL}/register`, async () => {
      const res = await request.post(`${URL}/register`).send(data);
      token = res.body.token;
      expect(res.body.success).to.eq(true);
      expect(res.body.token).to.not.be.empty;
    });

    it(`${URL}/login`, async () => {
      const res = await request.post(`${URL}/login`).send(data);
      expect(res.body.success).to.eq(true);
      expect(res.body.token).to.not.be.empty;
    });
  });

  describe('Negative Tests', () => {
    it('doesn\'t register a user with username already existing in database', async () => {
      const res = await request.post(`${URL}/register`).send(data);
      expect(res.body.success).to.eq(false);
      expect(res.body.message).to.eq('User already exist!');
    });

    it('doesn\'t login if the username doesn\'t exist in the database', async () => {
      const data = { username: 'Test Username One', password: 'Test Password' };
      const res = await request.post(`${URL}/login`).send(data);
      expect(res.body.success).to.eq(false);
      expect(res.body.message).to.eq('Username or password is incorrect!');
    });

    it('doesn\'t login if the password is incorrect', async () => {
      const data = { username: 'Test Username', password: 'Test Password One' };
      const res = await request.post(`${URL}/login`).send(data);
      expect(res.body.success).to.eq(false);
      expect(res.body.message).to.eq('Username or password is incorrect!');
    });
  });

  describe('DELETE', () => {
    it(`/${URL}`, async () => {
      const res = await request.delete(URL).set('token', token);
      expect(res.body.success).to.eq(true);
    });
  });
});
