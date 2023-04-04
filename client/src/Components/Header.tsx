import { Link } from 'react-router-dom';
import { FaCloud } from 'react-icons/fa';

const Header: React.FC = () => {
    const links = [
        { to: '/', label: 'Home' },
        { to: '/dashboard', label: 'Admin' },
      ];
    const isLoggedIn = localStorage.getItem('access_token');
    const handleLogout = () => {
      localStorage.removeItem('access_token');
      window.location.href = '/login';
    }

  return (
    <header className="flex justify-between items-center bg-gray-800 text-white p-4">
      <Link to="/" className="flex items-center">
        <FaCloud className="text-xl mr-2" />
        <h1 className="text-xl font-bold">Jumping on the Clouds</h1>
      </Link>
      <nav>
        {links.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className="mx-2 hover:underline"
          >
            {link.label}
          </Link>
        ))}
        {isLoggedIn && (
          <button className="mx-2 hover:underline" onClick={handleLogout}>
            Logout
          </button>
        )}
      </nav>
    </header>
  );
};

export default Header;
