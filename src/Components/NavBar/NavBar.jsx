import { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext.jsx';

const NavBar = () => {
  const { userData, setUserData } = useContext(UserContext);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true); // State to manage navbar visibility
  const [lastScrollPosition, setLastScrollPosition] = useState(0); // State to track last scroll position

  // Function to handle scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;

      if (currentScroll > lastScrollPosition && currentScroll > 50) {
        // Scrolling down
        setIsNavbarVisible(false);
      } else {
        // Scrolling up
        setIsNavbarVisible(true);
      }

      setLastScrollPosition(currentScroll);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollPosition]);

  function logOut() {
    localStorage.removeItem("userToken");
    setUserData(null);
    navigate("/login");
    setIsMenuOpen(false); 
  }

  return (
    <div
      className={`bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white px-6 py-3 fixed top-0 left-0 right-0 z-50 shadow-xl transition-transform duration-300 ${
        isNavbarVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo Section */}
        <div className="flex items-center space-x-3">
          <img
            src="src/assets/student.png"
            alt="Logo"
            className="w-10 h-10 rounded-full object-cover border-2 border-white"
          />
          <Link
            to="/"
            className="text-2xl font-bold tracking-wide hover:text-gray-300 transition duration-300 ease-in-out transform hover:scale-105 hover:drop-shadow-lg"
          >
            StudUp
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          {userData ? (
            <>
              <Link
                to="/"
                className="relative group text-lg text-white"
              >
                Home
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-300 transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link
                to="/student-activities"
                className="relative group text-lg text-white"
              >
                Student Activities
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-300 transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link
                to="/events"
                className="relative group text-lg text-white"
              >
                Events
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-300 transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link
              to="/opportunities"
              className="relative group text-lg text-white py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Opportunities
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-300 transition-all duration-300 group-hover:w-full"></span>
            </Link>
              <Link
                to="/profile"
                className="relative group text-lg text-white"
              >
                Profile
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-300 transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <button
                onClick={logOut}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl hover:ring-4 hover:ring-red-500"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl hover:ring-4 hover:ring-green-500"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl hover:ring-4 hover:ring-blue-500"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            className="text-white focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden flex flex-col items-center bg-gray-900 transition-all duration-300 ease-in-out ${
          isMenuOpen ? "max-h-screen py-4" : "max-h-0 overflow-hidden"
        }`}
      >
        {userData ? (
          <>
            <Link
              to="/"
              className="relative group text-lg text-white py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-300 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              to="/student-activities"
              className="relative group text-lg text-white py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Studend activities
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-300 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              to="/events"
              className="relative group text-lg text-white py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Events
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-300 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              to="/opportunities"
              className="relative group text-lg text-white py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Opportunities
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-300 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              to="/profile"
              className="relative group text-lg text-white py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Profile
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-300 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            
            <button
              onClick={logOut}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl hover:ring-4 hover:ring-red-500 mt-2"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl hover:ring-4 hover:ring-green-500 mt-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl hover:ring-4 hover:ring-blue-500 mt-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Register
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default NavBar;
