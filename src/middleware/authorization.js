import { verify } from 'jsonwebtoken';
import { config } from 'dotenv';

config();

export default function authorization(req, res, next) {
  try {
    const jwtToken = req.header('token');
    if (!jwtToken)
      return res.status(403).send('Not Authorized!');
    const payload = verify(jwtToken, process.env.jwtSecret);
    req.id = payload.id;
  } catch (exception) {
    console.error(exception.message);
    return res.status(403).send('Not Authorized!');
  }
  next();
}
