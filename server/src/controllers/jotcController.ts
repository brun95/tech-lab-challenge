import { Request, Response } from 'express';
import { jumpingOnTheClouds, saveJotcRequest, getAllJotcRequests, validateJotcInput } from '../services/jotcService';

export const createJotc = async (req: Request, res: Response) => {
  try {
    const { numbers, email } = req.body;
    let errors: string[] = [];

    errors = validateJotcInput(numbers)

    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    const result = jumpingOnTheClouds(numbers);

    await saveJotcRequest(numbers, email, result.jumps);

    res.status(200).json({ "jumps": result.jumps, "idxPath": result.idxPath });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
};

export const listJotcRequests = async (req: Request, res: Response) => {
  try {
    const jotcRequests = await getAllJotcRequests();

    res.status(200).json(jotcRequests);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
};