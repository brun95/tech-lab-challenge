import { Request, Response } from 'express';
import { authenticate, validateToken } from '../services/authService';
import jwt from 'jsonwebtoken';

export async function authenticateHandler(req: Request, res: Response) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  //using Basic Auth with email as Username and password as Password
  const auth = Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
  const email = auth[0];
  const password = auth[1];

  const user = await authenticate(email, password);
  if (!user) {
    return res.status(401).json({ message: ['Invalid email or password'] });
  }

  // Create a JWT token and send it back to the client
  const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET as string, {
      expiresIn: '1h',
  });

  return res.status(200).json({ token });
}

export function tokenHandler(req: Request, res: Response): Response {
  const { token } = req.body;
  const isValid = validateToken(token);

  if (!isValid) {
    return res.status(401).send("Invalid token");
  }

  return res.status(200).send("Token is valid");
}