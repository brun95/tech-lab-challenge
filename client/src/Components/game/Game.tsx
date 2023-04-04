import React, { useEffect, useState } from 'react';
import { useNavigate , useLocation } from 'react-router-dom';
import { submitJotcRequest } from '../../services/api';
import ErrorMsgs from '../common/ErrorMsgs';

const Game: React.FC = () => {
  const [numbers, setNumbers] = useState<number[]>([]);
  const [idxPath, setIdxPath] = useState<number[] | null>([]);
  const [result, setResult]   = useState<number | null>(null);
  const [errors, setErrors]   = useState<string[]>([]);
  const navigate  = useNavigate();
  const location  = useLocation();

  useEffect(() => {
    if(!location.state){
      navigate('/');
    }
  }, [location.state, navigate]);

  const username  = location.state?.username;
  const email     = location.state?.email;

  const handleGameStart = async () => {
    const input       = document.getElementById('number-input') as HTMLInputElement;
    const inputString = input.value;
    const newNumbers  = inputString.split('').map((str) => parseInt(str, 10));
    setNumbers(newNumbers);

    try {
      const { jumps, idxPath, errors } = await submitJotcRequest(email, newNumbers);

      setResult(jumps);
      setIdxPath(idxPath);
      setErrors(errors);
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.errors) {
        setErrors(error.response.data.errors);
      } else {
        setErrors(['An error occurred. Please try again.']);
      }
      setResult(null);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== '0' && event.key !== '1') {
      event.preventDefault();
    }
  };

  const handleRestart = () => {
    setNumbers([]);
    setResult(null);
    const input = document.getElementById('number-input') as HTMLInputElement;
    input.value = '';
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="text-4xl font-bold mb-4 mt-8">Welcome, {username}!</h1>
      
      <div className="flex items-center justify-center mb-4">
        <label htmlFor="number-input" className="mr-2 font-bold">
          Input a list of 0 and 1 to play:
        </label>
        <input type="number" id="number-input" className="border rounded-md p-2 w-24" min="0" max="1" onKeyPress={handleKeyPress} required />
      </div>

      {errors.length > 0 && <ErrorMsgs errors={errors} />}

      <div className="flex mt-6">
        <button onClick={handleGameStart} className="bg-blue-500 text-white font-bold py-2 px-4 rounded mr-4">
          GAME
        </button>
        {result && 
          <button onClick={handleRestart} className="bg-red-500 text-white font-bold py-2 px-4 rounded">
            CLEAR
          </button>
        }
      </div>

      <div className="flex justify-center flex-wrap mt-12">
  {numbers.map((number, index) => (
    <div key={index} className="rounded-full w-12 h-12 flex items-center justify-center mr-2 relative mb-2">
      {number === 0 && !idxPath?.includes(index) && (
        <div className="absolute bg-green-400 rounded-full w-10 h-10 flex items-center justify-center">
          {number}
        </div>
      )}
      {number === 1 && (
        <div className="absolute bg-red-400 rounded-full w-10 h-10 flex items-center justify-center">
          {number}
        </div>
      )}
      {idxPath?.includes(index) && (
        <div className="absolute bg-blue-400 rounded-full w-12 h-12 flex items-center justify-center">
          <div className="bg-green-400 rounded-full w-8 h-8 flex items-center justify-center">
            {number}
          </div>
        </div>
      )}
    </div>
  ))}
</div>

      
      {result && <div className="text-2xl font-bold mt-12">Result: {result}</div>}
    </div>
  );
};

export default Game;
