import { expect } from 'chai';
import request from './helpers/request';
import { createUser, deleteUser } from './helpers/userHelper';

const URL = 'projects';

describe(URL, () => {
  const userOne = { username: 'Test Username One', password: 'Test Password' };
  const userTwo = { username: 'Test Username Two', password: 'Test Password' };
  const data = { name: 'Test Project Name' };
  let tokenOne, tokenTwo, id;

  before(async () => {
    const resOne = await createUser(userOne.username, userOne.password)
    tokenOne = resOne.body.token;
  
    const resTwo = await createUser(userTwo.username, userTwo.password)
    tokenTwo = resTwo.body.token;
  });

  describe('POST', () => {
    it(`/${URL}`, async () => {
      const res = await request.post(URL).set('token', tokenOne).send(data);
      id = res.body.id;
      expect(res.body.success).to.eq(true);
      expect(res.body.id).to.not.be.null;
    });
  });

  describe('GET', () => {
    it(`/${ URL }`, async () => {
      const res = await request.get(URL).set('token', tokenOne);
      expect(res.body.success).to.eq(true);
    });

    it(`/${ URL }/:id`, async () => {
      const res = await request.get(`${URL}/${id}`).set('token', tokenOne);
      expect(res.body.success).to.eq(true);
      expect(res.body.project.name).to.eq(data.name);
    });
  });

  describe('PUT', () => {
    it(`/${ URL }/:id`, async () => {
      const data = { name: 'Test Project Name One' };
      const res = await request.put(`${URL}/${id}`).set('token', tokenOne).send(data);
      expect(res.body.success).to.eq(true);
    });
  });

  describe('Negative Auth Tests', () => {
    it('Doesn\'t get other\'s user project', async () => {
      const res = await request.get(`${URL}/${id}`).set('token', tokenTwo);
      expect(res.body.success).to.eq(false);
    });

    it('Doesn\'t put other\'s user project', async () => {
      const data = { name: 'Test Project Name Two' };
      const res = await request.put(`${URL}/${id}`).set('token', tokenTwo).send(data);
      expect(res.body.success).to.eq(false);
    });

    it('Doesn\'t delete other\'s user project', async () => {
      const res = await request.delete(`${ URL }/${ id }`).set('token', tokenTwo);
      expect(res.body.success).to.eq(false);
    });
  });

  describe('DELETE', () => {
    it(`/${ URL }/:id`, async () => {
      const res = await request.delete(`${ URL }/${ id }`).set('token', tokenOne);
      expect(res.body.success).to.eq(true);
    });
  });

  describe('Negative ID Tests', () => {
    it('Doesn\'t get a project that does\'t exist', async () => {
      const res = await request.get(`${URL}/${id}`).set('token', tokenOne);
      expect(res.body.success).to.eq(false);
    });

    it('Doesn\'t put a project that does\'t exist', async () => {
      const data = { name: 'Test Project Name One' };
      const res = await request.put(`${URL}/${id}`).set('token', tokenOne).send(data);
      expect(res.body.success).to.eq(false);
    });

    it('Doesn\'t delete a project that does\'t exist', async () => {
      const res = await request.delete(`${ URL }/${ id }`).set('token', tokenOne);
      expect(res.body.success).to.eq(false);
    });
  });

  after(async () => {
    await deleteUser(tokenOne);
    await deleteUser(tokenTwo);
  });
});
