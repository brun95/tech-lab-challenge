import React, { useEffect } from "react";

const NotFoundPage = () => {
  useEffect(() => {
    const redirectTimer = setTimeout(() => {
      window.location.replace("/");
    }, 5000);

    return () => {
      clearTimeout(redirectTimer);
    };
  }, []);

  const handleRedirect = () => {
    window.location.replace("/");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="mb-4">Sorry, the page you are looking for does not exist.</p>
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={handleRedirect}
      >
        Go back to homepage
      </button>
    </div>
  );
};

export default NotFoundPage;
