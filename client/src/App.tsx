import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from "react"
import Header from './Components/Header';
import ParticipationForm from './Components/ParticipationForm';
import AdminDashboard from './Components/AdminDashboard';
import Login from './Components/Login';
import Game from './Components/Game';
import { isValidToken } from './services/api';
import NotFoundPage from './Components/NotFoundPage';
import Footer from './Components/Footer';

const App = () => {
  const [authenticated, setAuthenticated] = useState(false)

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<ParticipationForm />} />
          <Route path="/game" element={<Game />} />
          <Route path="/login" element={<Login setAuthenticated={setAuthenticated}/>} />
          <Route
            path="/dashboard"
            element={
              authenticated && localStorage.getItem("access_token") && isValidToken(localStorage.getItem("access_token")) ? (
                <AdminDashboard />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;
