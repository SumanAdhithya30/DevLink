import React, { useState, useEffect } from 'react';
// --- FIX 1: Import useLocation ---
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  
  // Get the current location object
  const location = useLocation();

  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // --- FIX 2: Create a variable to determine if the navbar should be solid ---
  // It's solid if you've scrolled OR if you are NOT on the homepage.
  const isSolid = isScrolled || location.pathname !== '/';


  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsOpen(false);
    navigate('/');
  };

  const NavLink = ({ to, children, isPageLink = false }) => {
    const handleClick = (e) => {
        if (!isPageLink) {
            e.preventDefault();
            // This logic is for homepage anchor links. It's safe to keep.
            const element = document.querySelector(to);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
        setIsOpen(false);
    };
    
    return isPageLink ? (
        <Link to={to} onClick={handleClick} className="py-2 px-4 text-gray-300 hover:text-white transition-colors duration-300">
            {children}
        </Link>
    ) : (
        <a href={to} onClick={handleClick} className="py-2 px-4 text-gray-300 hover:text-white transition-colors duration-300">
            {children}
        </a>
    );
  };

  return (
    // --- FIX 3: Use the 'isSolid' variable to control the background ---
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isSolid ? 'bg-gray-900 shadow-lg' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          <div className="flex-shrink-0">
            {/* --- FIX 4: The logo ALWAYS links to the homepage --- */}
            <Link to="/" className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              DevLink
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {token ? (
              // --- Logged IN Desktop ---
              <>
                <NavLink to="/dashboard" isPageLink={true}>Dashboard</NavLink>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-lg transition-transform transform hover:scale-105"
                >
                  Logout
                </button>
              </>
            ) : (
              // --- Logged OUT Desktop ---
              <>
                <NavLink to="#features">Features</NavLink>
                <NavLink to="#how-it-works">How It Works</NavLink>
                <NavLink to="/login" isPageLink={true}>Login</NavLink>
                <Link to="/register" className="ml-4 px-5 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300">
                  Sign Up
                </Link>
              </>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-300 hover:text-white focus:outline-none">
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>

        </div>
      </div>

      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden bg-gray-900 bg-opacity-95 backdrop-blur-sm`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col items-center">
           {token ? (
              <>
                <NavLink to="/dashboard" isPageLink={true}>Dashboard</NavLink>
                <button
                  onClick={handleLogout}
                  className="w-full mt-2 bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-3 rounded-lg"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink to="#features">Features</NavLink>
                <NavLink to="#how-it-works">How It Works</NavLink>
                <NavLink to="/login" isPageLink={true}>Login</NavLink>
                <Link to="/register" onClick={() => setIsOpen(false)} className="w-full text-center mt-2 px-5 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700">
                  Sign Up
                </Link>
              </>
            )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;


// import { Link } from "react-router-dom";

// const Navbar = () => {
//   return (
//     <nav className="bg-blue-600 text-white p-4 flex justify-between">
//       <div className="font-bold text-xl">DevLink</div>
//       <div className="flex gap-4">
//         <Link to="/" className="hover:underline">Home</Link>
//         <Link to="/login" className="hover:underline">Login</Link>
//         <Link to="/register" className="hover:underline">Register</Link>
//         <Link to="/dashboard" className="hover:underline">Dashboard</Link>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
