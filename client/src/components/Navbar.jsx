import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Initialize dark mode (check localStorage)
  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(savedMode);
    if (savedMode) document.documentElement.classList.add("dark");
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("darkMode", newMode.toString());
    document.documentElement.classList.toggle("dark");
  };

  return (
    <nav className="bg-gradient-to-r from-purple-600 to-blue-600 dark:from-gray-800 dark:to-gray-900 text-white dark:text-gray-100 sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="font-bold text-2xl hover:text-cyan-200 transition-colors duration-200"
          >
            DevLink
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex gap-8 items-center">
            <Link to="/" className="hover:text-cyan-200 hover:underline underline-offset-4">Home</Link>
            <Link to="/login" className="hover:text-cyan-200 hover:underline underline-offset-4">Login</Link>
            <Link to="/register" className="hover:text-cyan-200 hover:underline underline-offset-4">Register</Link>
            <Link to="/dashboard" className="hover:text-cyan-200 hover:underline underline-offset-4">Dashboard</Link>
          </div>

          {/* Dark Mode Toggle + Mobile Menu Button */}
          <div className="flex items-center gap-4">
            <button 
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-purple-700 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                // Sun icon (light mode)
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                // Moon icon (dark mode)
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-white hover:text-cyan-200 focus:outline-none"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown (conditionally rendered) */}
        {isOpen && (
          <div className="md:hidden bg-purple-700 dark:bg-gray-800 bg-opacity-90 dark:bg-opacity-90 pb-4 px-4 rounded-b-lg">
            <Link to="/" className="block py-2 hover:text-cyan-200" onClick={() => setIsOpen(false)}>Home</Link>
            <Link to="/login" className="block py-2 hover:text-cyan-200" onClick={() => setIsOpen(false)}>Login</Link>
            <Link to="/register" className="block py-2 hover:text-cyan-200" onClick={() => setIsOpen(false)}>Register</Link>
            <Link to="/dashboard" className="block py-2 hover:text-cyan-200" onClick={() => setIsOpen(false)}>Dashboard</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;