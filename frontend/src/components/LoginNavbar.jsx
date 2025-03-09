import React from 'react';
import { Link } from 'react-router-dom';
import {motion} from 'framer-motion'
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    
    const handleLogout = () => {
      console.log("Logging out...:", localStorage.getItem('user'));
      localStorage.removeItem('token');
      localStorage.removeItem('user'); 
      navigate('/'); 
    };
  return (
    <div className='flex justify-between items-center bg-[#fbfffe] p-5 text-black font-bold backdrop-blur-lg drop-shadow-lg'>
      <motion.div
  initial={{ x: 0, opacity: 0 }}
  animate={{ x: 0, opacity: 1 }}
  transition={{ type: 'tween', ease: 'easeInOut', duration: 1.5 }}
  className='flex items-center relative'
>
  <img src="cooking1.png" alt="Logo" className='w-8 h-8 hidden md:block' />
  <Link 
    to="/" 
    className='text-3xl md:ml-3 relative'
    id='title'
  >
    Thindham

    <motion.div 
      initial={{ width: 0 }}
      animate={{ width: "100%" }}
      transition={{ duration: 2, ease: "easeInOut", delay: 2 }}
      className="absolute bottom-0 left-0 h-1 bg-amber-500"
    />
  </Link>
</motion.div>

      <motion.div
      initial={{ x: 0, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: 'tween', ease: 'easeInOut', duration: 1.5 }}
      >
        <ul className='flex md:gap-6 gap-0 items-center'>
          <Link 
            to="/" 
            className='relative md:px-4 px-2 py-1 text-lg transition-all duration-300 hover:text-yellow-500 before:content-[""] before:absolute before:bottom-0 before:left-0 before:right-0 before:h-0.5 before:bg-yellow-500 before:scale-x-0 hover:before:scale-x-50 before:transition-transform before:duration-300'
          >
            Home
          </Link>
          <li onClick={handleLogout} className='bg-red-700 hover:cursor-pointer text-white px-6 py-2 rounded-full font-bold hover:bg-red-700 transition'>
          Logout
        </li>
        </ul>
      </motion.div>
    </div>
  );
};

export default Navbar;
