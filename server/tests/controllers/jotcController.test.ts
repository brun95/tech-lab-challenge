import { Request, Response } from 'express';
import { createJotc, listJotcRequests } from '../../src/controllers/jotcController';
import { jumpingOnTheClouds, saveJotcRequest, getAllJotcRequests, validateJotcInput } from '../../src/services/jotcService';

jest.mock('../../src/services/jotcService');

const mockedJumpingOnTheClouds = jumpingOnTheClouds as jest.MockedFunction<typeof jumpingOnTheClouds>;
const mockedSaveJotcRequest = saveJotcRequest as jest.MockedFunction<typeof saveJotcRequest>;
const mockedValidateJotcInput = validateJotcInput as jest.MockedFunction<typeof validateJotcInput>;

describe('createJotc', () => {
  const req = {
    body: {
      numbers: [0, 0, 1, 0, 0, 1, 0],
      email: 'test@example.com',
    },
  } as Request;

  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  } as unknown as Response;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return 400 with validation errors if input is invalid', async () => {
    const errors = ['Invalid input'];
    mockedValidateJotcInput.mockReturnValue(errors);

    await createJotc(req, res);

    expect(mockedValidateJotcInput).toHaveBeenCalledWith(req.body.numbers);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ errors });
    expect(mockedJumpingOnTheClouds).not.toHaveBeenCalled();
    expect(mockedSaveJotcRequest).not.toHaveBeenCalled();
  });

  it('should call the service functions and return the result if input is valid', async () => {
    const numbers = [0, 0, 1, 0, 0, 1, 0];
    const email = 'test@example.com';
    const jumps = 3;
    const idxPath = [0,1,3,4,6];

    mockedValidateJotcInput.mockReturnValue([]);
    mockedJumpingOnTheClouds.mockReturnValue({ "jumps": jumps, "idxPath": idxPath });

    await createJotc(req, res);

    expect(mockedValidateJotcInput).toHaveBeenCalledWith(numbers);
    expect(mockedJumpingOnTheClouds).toHaveBeenCalledWith(numbers);
    expect(mockedSaveJotcRequest).toHaveBeenCalledWith(numbers, email, jumps);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ "jumps": jumps, "idxPath": idxPath });
  });

  it('should return 500 and an error message if an error occurs', async () => {
    const error = new Error('An error occurred');
    mockedValidateJotcInput.mockReturnValue([]);
    mockedJumpingOnTheClouds.mockImplementation(() => {
      throw error;
    });

    await createJotc(req, res);

    expect(mockedValidateJotcInput).toHaveBeenCalledWith(req.body.numbers);
    expect(mockedJumpingOnTheClouds).toHaveBeenCalledWith(req.body.numbers);
    expect(mockedSaveJotcRequest).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'An error occurred' });
  });
});

const mockedGetAllJotcRequests = getAllJotcRequests as jest.MockedFunction<typeof getAllJotcRequests>;

describe('listJotcRequests', () => {
  const req = {} as Request;
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  } as unknown as Response;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return a list of jotc requests', async () => {
    const jotcRequests = [
      {
        id: '1',
        numbers: [0, 0, 1, 0, 0, 1, 0],
        email: 'test@example.com',
        result: 3,
        createdAt: new Date('2022-12-31T23:59:59.999Z'),
      },
      {
        id: '2',
        numbers: [0, 0, 1, 1, 0, 0],
        email: 'test2@example.com',
        result: 2,
        createdAt: new Date('2022-12-30T23:59:59.999Z'),
      },
    ];

    mockedGetAllJotcRequests.mockResolvedValue(jotcRequests);

    await listJotcRequests(req, res);

    expect(mockedGetAllJotcRequests).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(jotcRequests);
  });

  it('should return 500 and an error message if an error occurs', async () => {
    const error = new Error('An error occurred');
    mockedGetAllJotcRequests.mockRejectedValue(error);

    await listJotcRequests(req, res);

    expect(mockedGetAllJotcRequests).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'An error occurred' });
  });
});