import React from 'react';

type Props = {
  errors: string[];
};

const ErrorMsgs: React.FC<Props> = ({ errors }) => {
  return (
    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
      <p className="font-bold">Errors:</p>
      <ul className="list-disc ml-4">
        {errors.map((error, index) => (
          <li key={index}>{error}</li>
        ))}
      </ul>
    </div>
  );
};

export default ErrorMsgs;
