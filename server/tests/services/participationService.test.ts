import axios from 'axios';
import { validateEmail, validateUser } from '../../src/services/participationService';
import { User } from '../../src/types';

jest.mock('axios');

describe('validateEmail', () => {
  const mockedAxios = axios as jest.Mocked<typeof axios>;

  it('should return email validation result for a valid email', async () => {
    const apiKey = 'test_api_key';
    const email = 'test@example.com';
    const expectedResult = { state: 'deliverable' };

    process.env.API_KEY = apiKey;
    mockedAxios.post.mockResolvedValueOnce({ data: expectedResult });

    const result = await validateEmail(email);

    expect(mockedAxios.post).toHaveBeenCalledWith(`https://api.emailable.com/v1/verify?email=${email}&api_key=${apiKey}`);
    expect(result).toEqual(expectedResult);
  });

  it('should throw an error for an invalid email', async () => {
    const apiKey = 'test_api_key';
    const email = 'invalid_email';
    const expectedError = new Error('Request failed with status code 400');

    process.env.API_KEY = apiKey;
    mockedAxios.post.mockRejectedValueOnce(expectedError);

    await expect(validateEmail(email)).rejects.toThrow(expectedError);
  });
});

describe('validateUser', () => {
  it('should return an empty array for a valid user', () => {
    const user: User = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'johndoe@example.com',
      dateOfBirth: '1990-01-01',
    };

    const result = validateUser(user);

    expect(result).toEqual([]);
  });

  it('should return an array of errors for an invalid user', () => {
    const user: User = {
      firstName: 'J',
      lastName: 'D',
      email: 'johndoe@example.com',
      dateOfBirth: '2020-01-01',
    };
    const expectedErrors = [
      'First Name must have between 2 and 10 characters',
      'Last Name must have between 2 and 10 characters',
      'User must be at least 18 years old',
    ];

    const result = validateUser(user);

    expect(result).toEqual(expectedErrors);
  });
});
