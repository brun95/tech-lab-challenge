import axios from 'axios';
import { User } from '../types';

interface EmailValidationResult {
  state: string;
}

export const validateEmail = async (email: string): Promise<EmailValidationResult> => {
  const apiKey = process.env.API_KEY;
  const apiUrl = `https://api.emailable.com/v1/verify?email=${email}&api_key=${apiKey}`;

  const response = await axios.post(apiUrl);

  return response.data;
};

export const validateUser = (user: User) => {
    const errors: string[] = [];
    if (!user.firstName || user.firstName.length < 2 || user.firstName.length > 10) {
        errors.push('First Name must have between 2 and 10 characters');
    }

    if (!user.lastName || user.lastName.length < 2 || user.lastName.length > 10) {
        errors.push('Last Name must have between 2 and 10 characters');
    }

    if(!user.dateOfBirth){
        errors.push('Date of Birth is missing');
    } else {
        const currentDate = new Date();
        const userDateOfBirth = new Date(user.dateOfBirth);
    
        if (currentDate.getFullYear() - userDateOfBirth.getFullYear() < 18) {
            errors.push('User must be at least 18 years old');
        }
    }

    return errors;
};