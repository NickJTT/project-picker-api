import { expect } from 'chai';
import request from './helpers/request';
import { deleteUser, getUserIdFromToken } from './helpers/userHelper';

const URL = 'auth';

describe(URL, () => {
  let id;
  const data = { username: 'Test Username', password: 'Test Password' };
  
  describe('register', () => {
    it('registers a user successfully', async () => {
      const res = await request.post(`${URL}/register`).send(data);
      id = getUserIdFromToken(res.body.token);
      expect(res.body.success).to.eq(true);
      expect(res.body.token).to.not.be.empty;
    });

    it('doesn\'t register a user with username already existing in database', async () => {
      const res = await request.post(`${URL}/register`).send(data);
      expect(res.body.success).to.eq(false);
      expect(res.body.message).to.eq('User already exist!');
    });
  });

  describe('login', () => {
    it('logs in successfully', async () => {
      const res = await request.post(`${URL}/login`).send(data);
      expect(res.body.success).to.eq(true);
      expect(res.body.token).to.not.be.empty;
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

  after(async () => {
    await deleteUser(id);
  });
});
