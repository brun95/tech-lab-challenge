import axios from 'axios';
import { API_BASE_URL } from '../config';

export const submitJotcRequest = async (email: string, numbers: number[]): Promise<{ jumps: number | null, idxPath: number[] | null, errors: string[] }> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/jotc-requests`, {
      email,
      numbers,
    });
    return { jumps: response.data.jumps, idxPath: response.data.idxPath, errors: [] };
  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.errors) {
      return { jumps: null, idxPath: null, errors: error.response.data.errors };
    } else {
      return { jumps: null, idxPath: null, errors: ['An error occurred. Please try again.'] };
    }
  }
};

export const authenticate = async (email: string, password: string) => {
    const auth = btoa(`${email}:${password}`);
    try {
      const response = await axios.post(`${API_BASE_URL}/authenticate`, {}, {
        headers: {
          'Authorization': `Basic ${auth}`
        }
      });
      if (response.status === 200) {
        const token = response.data.token;
  
        localStorage.setItem('access_token', token);
  
        return { result: token, errors: [] };
      } else {
        return { result: false, errors: [response.data.message] };
      }
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.errors) {
        return { result: false, errors: error.response.data.errors };
      } else {
        return { result: false, errors: ['An error occurred. Please try again.'] };
      }
    }
  };

  export const validateParticipation = async (firstName: string, lastName: string, email: string, dateOfBirth: string) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/validate-participation`, {
        firstName,
        lastName,
        email,
        dateOfBirth,
      });
  
      if (response.status === 200) {
        return { result: true, errors: [] };
      } else {
        return { result: false, errors: response.data.error };
      }
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.errors) {
        return { result: false, errors: error.response.data.errors };
      } else {
        return { result: false, errors: ['An error occurred. Please try again.'] };
      }
    }
  }
  
  export const getJotcRequests = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/jotc-requests`);
      return { requests: response.data, error: null };
    } catch (error: any) {
      return { requests: null, error: error.response.data };
    }
  }

  export const isValidToken = (token: string | null) => {
    if (!token) {
      return false;
    }
    const parts = token.split('.');
  
    if (parts.length !== 3) {
      return false;
    }
  
    const payload = JSON.parse(atob(parts[1]));
  
    // Check the token's expiration time
    const now = Math.round(new Date().getTime() / 1000);
    if (payload.exp && payload.exp < now) {
      return false;
    }
  
    return true
  }