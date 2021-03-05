import { genSalt, hash } from 'bcrypt';

const ROUNDS = 10;

export default async function(password) {
  const salt = await genSalt(ROUNDS);
  return await hash(password, salt);
}
