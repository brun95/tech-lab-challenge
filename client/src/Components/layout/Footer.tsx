import React from 'react';

const Footer: React.FC = () => {
  const author: string = "Bruno Conceição";
  const year: number = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white p-4 py-4 fixed bottom-0 w-full">
      <div className="container mx-auto px-4">
        <p className="text-center">
          © {year} {author}
        </p>
      </div>
    </footer>
  );
};

export default Footer;