import { verify } from 'jsonwebtoken';
import { config } from 'dotenv';
import request from './request';

config();

const URL = 'auth';

export const createUser = async (username, password) => {
  const data = { username, password };
  return await request.post(`${URL}/register`).send(data);
}

export const getUserIdFromToken = token => {
  const payload = verify(token, process.env.jwtSecret);
  return payload.id;
}

export const deleteUser = async token => {
  await request.delete(URL).set('token', token);
}
