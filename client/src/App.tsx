import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './Components/Header';
import ParticipationForm from './Components/ParticipationForm';
import AdminDashboard from './Components/AdminDashboard';
import Login from './Components/Login';
import Game from './Components/Game';
import { isValidToken } from './services/api';
import NotFoundPage from './Components/NotFoundPage';
import Footer from './Components/Footer';

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
