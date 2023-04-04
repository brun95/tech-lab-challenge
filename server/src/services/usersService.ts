import { User } from '../models/User';
import { db_all } from '../utils/database';
import { getUsersByEmail } from '../utils/queries';

export async function findByEmail(email: string): Promise<User | null> {
  const rows = await db_all(getUsersByEmail, [email]);
  
  if (rows.length === 0) {
    return null;
  }
  return rows[0];
}