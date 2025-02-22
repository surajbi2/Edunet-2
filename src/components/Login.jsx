import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const Login = () => {
  return (
    <div className="w-full min-h-screen bg-[url('/login-bg.jpg')] bg-cover bg-center flex flex-col">
      {/* <Navbar /> */}
      <div className="flex flex-1 items-center justify-center px-4 inset-0 bg-opacity-100 backdrop-blur-xs">
        <div className="bg-white bg-opacity-90 p-8 rounded-xl shadow-lg w-full max-w-md">
          <h2 className="text-3xl font-bold text-center text-gray-800">Welcome Back!</h2>
          <p className="text-center text-gray-600 mb-6">Login to continue ordering delicious food</p>
          
          <form className="space-y-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Email</label>
              <input type="email" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none" placeholder="Enter your email" />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Password</label>
              <input type="password" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none" placeholder="Enter your password" />
            </div>
            <button className="w-full bg-yellow-500 cursor-pointer text-black font-semibold py-2 rounded-lg hover:bg-yellow-600 transition">Login</button>
          </form>
          
          <p className="text-center text-gray-600 mt-4">
            Don't have an account? <a href="/sign-up" className="text-yellow-500 font-semibold">Sign Up</a>
          </p>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default Login;