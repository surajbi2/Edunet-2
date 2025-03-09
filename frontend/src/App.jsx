import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import SignIn from './pages/SignIn';
import UserDashboard from './pages/UserDashboard';
import VendorSignIn from './pages/VendorSignIn';
import VendorLogin from './pages/VendorLogin';
import VendorDashboard from './pages/VendorDashboard';
import RestaurantPage from './pages/RestaurantPage';

function App() {
  return (
    <Router>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignIn />} />
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/v-signin" element={<VendorSignIn/>} />
        <Route path="/v-login" element={<VendorLogin/>} />
        <Route path="/vendor-dashboard" element={<VendorDashboard/>} />
        <Route path="/restaurant/:restaurantId" element={<RestaurantPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
