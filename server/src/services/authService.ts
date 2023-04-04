import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';
import { findByEmail } from './usersService';

export async function authenticate(email: string, password: string): Promise<User | null> {
  const user = await findByEmail(email);
  if (!user) {
    return null;
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return null;
  }
  return user;
}

export function validateToken(token: string | null): boolean {
  if (token === null) {
    return false;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    
    return true;
  } catch (err) {
    return false;
  }
}