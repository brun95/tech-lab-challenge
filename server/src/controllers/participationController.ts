import { Request, Response, NextFunction } from 'express';
import NodeCache from 'node-cache';
import { validateEmail, validateUser } from '../services/participationService';
import { ParticipationRequestBody } from '../types';

const cache = new NodeCache({ stdTTL: 60, checkperiod: 120 });

export const participationHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { firstName, lastName, email, dateOfBirth } = req.body as ParticipationRequestBody;

    const user = { firstName, lastName, email, dateOfBirth };
    const errors = validateUser(user);

    const cacheKey = `email-${email}`;
    const cacheValue = cache.get(cacheKey);
    let responseValue = '';

    if (cacheValue) {
      console.log(`Retrieved value for ${cacheKey} from cache`);
      responseValue = JSON.stringify(cacheValue);
    } else {
      const emailValidationResult = await validateEmail(email);
      if (emailValidationResult.state !== 'deliverable') {
        errors.push('Invalid email address');
      }
      cache.set(cacheKey, emailValidationResult.state);
      responseValue = emailValidationResult.state;
    }

    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }
    
    return res.send(responseValue);

  } catch (error) {
    return next(error);
  }
};
