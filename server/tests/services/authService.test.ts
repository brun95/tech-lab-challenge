import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { authenticate } from '../../src/services/authService';
import { findByEmail } from '../../src/services/usersService';
import { User } from '../../src/models/User';

jest.mock('../../src/services/usersService');
jest.mock('bcrypt');

describe('authenticate', () => {
  it('should return null if user is not found', async () => {
    (findByEmail as jest.Mock).mockResolvedValueOnce(null);

    const user = await authenticate('test@example.com', 'password');

    expect(user).toBeNull();
  });

  it('should return null if password does not match', async () => {
    const mockUser = { email: 'test@example.com', password: 'hashedpassword' };

    (findByEmail as jest.Mock).mockResolvedValueOnce(mockUser);
    (bcrypt.compare as jest.Mock).mockResolvedValueOnce(false);

    const user = await authenticate('test@example.com', 'wrongpassword');

    expect(user).toBeNull();
  });

  it('should return user if email and password match', async () => {
    const mockUser = { email: 'test@example.com', password: 'hashedpassword' };

    (findByEmail as jest.Mock).mockResolvedValueOnce(mockUser);
    (bcrypt.compare as jest.Mock).mockResolvedValueOnce(true);

    const user = await authenticate('test@example.com', 'password');

    expect(user).toEqual(mockUser);
  });
});
