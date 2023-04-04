import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ErrorMsgs from '../common/ErrorMsgs';
import { validateParticipation } from '../../services/api';

const ParticipationForm = () => {
  const [email, setEmail]             = useState('');
  const [firstName, setFirstName]     = useState('');
  const [lastName, setLastName]       = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [errors, setErrors]           = useState<string[]>([]);
  const [isSignedUp, setIsSignedUp]   = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isSignedUp) {
      navigate('/game', { state: { username: firstName, email } });
    }
  }, [email, firstName, isSignedUp, navigate]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { result, errors } = await validateParticipation(firstName, lastName, email, dateOfBirth);
    if (result) {
      setIsSignedUp(true);
    } else {
      setErrors(errors);
    }
  };

  return (
    <>
     <form className="w-96 mx-auto mt-8" onSubmit={handleSubmit} data-testid="participation-form">
      <h1 className="text-4xl font-bold mb-4">Participation Form</h1>
            
      <label htmlFor="email" className="block text-lg font-medium text-gray-700 mb-2">Email:</label>
      <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full px-3 py-2 mb-4 text-gray-700 border rounded-lg focus:outline-none focus:shadow-outline-blue focus:border-blue-500" />

      <label htmlFor="firstName" className="block text-lg font-medium text-gray-700 mb-2">First Name:</label>
      <input type="text" id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} required className="w-full px-3 py-2 mb-4 text-gray-700 border rounded-lg focus:outline-none focus:shadow-outline-blue focus:border-blue-500" />

      <label htmlFor="lastName" className="block text-lg font-medium text-gray-700 mb-2">Last Name:</label>
      <input type="text" id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} required className="w-full px-3 py-2 mb-4 text-gray-700 border rounded-lg focus:outline-none focus:shadow-outline-blue focus:border-blue-500" />

      <label htmlFor="dateOfBirth" className="block text-lg font-medium text-gray-700 mb-2">Date of Birth:</label>
      <input type="date" id="dateOfBirth" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} required className="w-full px-3 py-2 mb-4 text-gray-700 border rounded-lg focus:outline-none focus:shadow-outline-blue focus:border-blue-500" />

      {errors.length > 0 && <ErrorMsgs errors={errors} />}

      <button type="submit" className="block w-full px-4 py-2 text-center text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Play</button>
    </form>


    </>
  );
};

export default ParticipationForm;
