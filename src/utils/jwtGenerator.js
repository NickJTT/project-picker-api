import { sign } from 'jsonwebtoken';
import { config } from 'dotenv';

config();

export default function jwtGenerator(id) {
  const payload = { id };
  return sign(payload, process.env.jwtSecret);
};
