import { verify } from 'jsonwebtoken';
import { config } from 'dotenv';
import UsersService from '../../src/services/UsersService';

config();

export const createUser = async (username, password) => {
  return await UsersService.register(username, password);
}

export const getUserIdFromToken = token => {
  const payload = verify(token, process.env.jwtSecret);
  return payload.id;
}

export const deleteUser = async id => {
  await UsersService.delete(id);
}
