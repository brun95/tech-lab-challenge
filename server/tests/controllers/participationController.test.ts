import { Request, Response, NextFunction } from 'express';
import NodeCache from 'node-cache';
import { participationHandler } from '../../src/controllers/participationController';
import { validateEmail, validateUser } from '../../src/services/participationService';
import { ParticipationRequestBody } from '../../src/types';

jest.mock('../../src/services/participationService');

describe('participationHandler', () => {
  const req = {} as Request;
  const res = {} as Response;
  const next = jest.fn() as NextFunction;
  const cache = new NodeCache({ stdTTL: 60, checkperiod: 120 });

  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
  });

  it('should return state from cache if present', async () => {
    const email = 'test@example.com';
    const cacheKey = `email-${email}`;
    const cacheValue = 'deliverable';
    cache.set(cacheKey, cacheValue);

    const reqBody = {
      firstName: 'Test',
      lastName: 'User',
      email,
      dateOfBirth: '2000-01-01',
    } as ParticipationRequestBody;

    req.body = reqBody;
    (validateUser as jest.Mock).mockReturnValue([]);
    (validateEmail as jest.Mock).mockReturnValue({ state: cacheValue });

    const resSend = jest.fn();
    res.send = resSend;

    await participationHandler(req, res, next);

    expect(validateUser).toHaveBeenCalledWith(reqBody);
    expect(resSend).toHaveBeenCalledWith(cacheValue);
  });

  it('should call email validation if cache not present', async () => {
    const email = 'test@example.com';
    const cacheKey = `email-${email}`;
    const cacheValue = 'deliverable';

    const reqBody = {
      firstName: 'Test',
      lastName: 'User',
      email,
      dateOfBirth: '2000-01-01',
    } as ParticipationRequestBody;

    req.body = reqBody;
    (validateUser as jest.Mock).mockReturnValue([]);
    (validateEmail as jest.Mock).mockReturnValue({ state: cacheValue });

    const resSend = jest.fn();
    res.send = resSend;

    await participationHandler(req, res, next);

    expect(validateUser).toHaveBeenCalledWith(reqBody);
    expect(cache.get(cacheKey)).toEqual(cacheValue);
    expect(resSend).toHaveBeenCalledWith(JSON.stringify(cacheValue));
  });

  it('should return 400 if user validation fails', async () => {
    const reqBody = {
      firstName: '',
      lastName: '',
      email: '',
      dateOfBirth: '2000-01-01',
    } as ParticipationRequestBody;

    req.body = reqBody;
    (validateUser as jest.Mock).mockReturnValue(['First name is required', 'Last name is required']);

    const resStatus = jest.fn().mockReturnThis();
    const resJson = jest.fn();
    res.status = resStatus;
    res.json = resJson;

    await participationHandler(req, res, next);

    expect(validateUser).toHaveBeenCalledWith(reqBody);
    expect(resStatus).toHaveBeenCalledWith(400);
    expect(resJson).toHaveBeenCalledWith({ errors: ['First name is required', 'Last name is required'] });
  });
});
