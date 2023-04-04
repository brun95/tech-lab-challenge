import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { authenticateHandler } from '../../src/controllers/authController';
import { authenticate } from '../../src/services/authService';

jest.mock('../../src/services/authService');
jest.mock('jsonwebtoken');

describe('authenticateHandler', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  const mockNext = jest.fn();

  beforeEach(() => {
    mockRequest = {
      headers: { authorization: 'Basic dGVzdEBleGFtcGxlLmNvbTp0ZXN0cGFzcw==' },
    };
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
  });

  it('should return a JWT token on successful authentication', async () => {
    const mockUser = { email: 'test@example.com', password: 'hashedpassword' };
    const mockToken = 'testtoken';

    (authenticate as jest.Mock).mockResolvedValueOnce(mockUser);
    (jwt.sign as jest.Mock).mockReturnValueOnce(mockToken as string);

    await authenticateHandler(mockRequest as Request, mockResponse as Response);

    expect(authenticate).toHaveBeenCalledWith('test@example.com', 'testpass');
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({ token: mockToken });
    expect(mockNext).not.toHaveBeenCalled();
  });

  it('should return a 401 error if authentication fails', async () => {
    (authenticate as jest.Mock).mockResolvedValueOnce(null);

    await authenticateHandler(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.status).toHaveBeenCalledWith(401);
    expect(mockResponse.json).toHaveBeenCalledWith({ message: ['Invalid email or password'] });
  });
});
