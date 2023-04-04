import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ErrorMsgs from './common/ErrorMsgs';
import { validateParticipation } from '../services/api';

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
    console.log(' olaaaaaaaaaaaaaaaa ', result)
    if (result) {
      setIsSignedUp(true);
    } else {
      setErrors(errors);
    }
  };

  return (
    <>
     <form className="flex flex-col gap-4 form-container mt-8" onSubmit={handleSubmit} data-testid="participation-form">
        <h1 className="text-4xl font-bold mb-4 mt-8">Participation Form</h1>
        
        <label htmlFor="email" className="text-lg font-medium">Email:</label>
        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="border rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-400" />

        <label htmlFor="firstName" className="text-lg font-medium">First Name:</label>
        <input type="text" id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} required className="border rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-400" />

        <label htmlFor="lastName" className="text-lg font-medium">Last Name:</label>
        <input type="text" id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} required className="border rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-400" />

        <label htmlFor="dateOfBirth" className="text-lg font-medium">Date of Birth:</label>
        <input type="date" id="dateOfBirth" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} required className="border rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-400" />

        {errors.length > 0 && <ErrorMsgs errors={errors} />}

        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 transition-colors">Play</button>
      </form>
    </>
  );
};

export default ParticipationForm;
