import { Link } from 'react-router-dom';

const NavBar = () => {
    // Placeholder for logout function
    const Logout = () => {
        console.log("User logged out");
    };

    return (
        <nav className="bg-gray-700 p-4 mb-5 fixed top-0 left-0 right-0 z-50 flex justify-around items-center">
            {/* Logo Section */}
            <div className="text-white text-2xl font-bold">
                <Link to="/">StudUp</Link>
            </div>

            {/* Navigation Links */}
            <ul className="flex space-x-6">
                <li>
                    <Link to="/" className="text-white text-lg hover:text-gray-300">Home</Link>
                </li>
                <li>
                    <Link to="/studentactivities" className="text-white text-lg hover:text-gray-300">Student Activities</Link>
                </li>
                <li>
                    <Link to="/events" className="text-white text-lg hover:text-gray-300">Events</Link>
                </li>
                <li>
                    <Link to="/opportunities" className="text-white text-lg hover:text-gray-300">Opportunities</Link>
                </li>
                <li>
                    <Link to="/profile" className="text-white text-lg hover:text-gray-300">Profile</Link>
                </li>
            </ul>

            {/* User Actions */}
            <div className="flex items-center space-x-4">
                {/* Logout Button */}
                <button
                    onClick={Logout}
                    className="text-white text-lg hover:text-gray-300 focus:outline-none"
                >
                    Logout
                </button>

                {/* Login/Register Links */}
                <Link to="/register" className="text-white text-lg hover:text-gray-300">Register</Link>
                <Link to="/login" className="text-white text-lg hover:text-gray-300">Login</Link>
            </div>
        </nav>
    );
};

export default NavBar;
