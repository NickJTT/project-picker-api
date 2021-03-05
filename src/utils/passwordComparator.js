import { compare } from 'bcrypt';

export default async function passwordComparator(original, encrypted) {
  return await compare(original, encrypted);
}
