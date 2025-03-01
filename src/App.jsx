import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import SignIn from './pages/SignIn';
import UserDashboard from './pages/UserDashboard';

function App() {
  return (
    <Router>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignIn />} />
        <Route path="/dashboard" element={<UserDashboard />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
