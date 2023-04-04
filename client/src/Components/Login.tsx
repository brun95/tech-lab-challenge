import React, { useState } from 'react';
import ErrorMsgs from './common/ErrorMsgs';
import { authenticate } from '../services/api';

const Login = () => {
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors]     = useState<string[]>([]);

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    
    try {
      const { result, errors } = await authenticate(email, password);
      if (result) {
        localStorage.setItem('authenticated', "true");
        window.location.href = '/../dashboard';
      } else {
        localStorage.removeItem('authenticated');
        setErrors(errors);
      }
    } catch (error: any) {
      localStorage.removeItem('authenticated');
      if (error.response && error.response.data && error.response.data.message) {
        setErrors(error.response.data.message);
      } else {
        setErrors(['An error occurred. Please try again.']);
      }
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="w-96 mx-auto mt-8">
        <h1 className="text-4xl font-bold mb-4">Administration</h1>
        
        <label htmlFor="email" className="block text-lg font-medium text-gray-700 mb-2">Email:</label>
        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full px-3 py-2 mb-4 text-gray-700 border rounded-lg focus:outline-none focus:shadow-outline-blue focus:border-blue-500" />

        <label htmlFor="password" className="block text-lg font-medium text-gray-700 mb-2">Password:</label>
        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full px-3 py-2 mb-4 text-gray-700 border rounded-lg focus:outline-none focus:shadow-outline-blue focus:border-blue-500" />

        {errors.length > 0 && <ErrorMsgs errors={errors} />}

        <button type="submit" className="block w-full px-4 py-2 text-center text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
          Log In
        </button>
      </form>
    </>
  );
};

export default Login;
