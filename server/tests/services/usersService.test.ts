import { findByEmail } from '../../src/services/usersService';
import { db_all } from '../../src/utils/database';
import { getUsersByEmail } from '../../src/utils/queries';

jest.mock('../../src/utils/database');
jest.mock('../../src/utils/queries');

describe('findByEmail', () => {
  const email = 'test@example.com';
  const user = {
    id: 1,
    email,
    firstName: 'Test',
    lastName: 'User',
  };

  beforeEach(() => {
    (db_all as jest.Mock).mockReset();
  });

  it('returns null when no user is found', async () => {
    (db_all as jest.Mock).mockResolvedValue([]);

    const result = await findByEmail(email);

    expect(db_all).toHaveBeenCalledWith(getUsersByEmail, [email]);
    expect(result).toBeNull();
  });

  it('returns the user when one is found', async () => {
    (db_all as jest.Mock).mockResolvedValue([user]);

    const result = await findByEmail(email);

    expect(db_all).toHaveBeenCalledWith(getUsersByEmail, [email]);
    expect(result).toEqual(user);
  });
});
