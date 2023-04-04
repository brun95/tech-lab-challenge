import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './Components/layout/Header';
import ParticipationForm from './Components/authentication/ParticipationForm';
import AdminDashboard from './Components/admin/AdminDashboard';
import Login from './Components/authentication/Login';
import Game from './Components/game/Game';
import { isValidToken } from './services/api';
import NotFoundPage from './Components/404/NotFoundPage';
import Footer from './Components/layout/Footer';

const App = () => {
  let authenticated = localStorage.getItem("authenticated");
  let acessToken = localStorage.getItem("access_token");

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<ParticipationForm />} />
          <Route path="/game" element={<Game />} />
          <Route path="/login" element={<Login/>} />
          <Route
            path="/dashboard"
            element={
              authenticated &&
              authenticated === "true" &&
              acessToken &&
              isValidToken(acessToken) ? (
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
