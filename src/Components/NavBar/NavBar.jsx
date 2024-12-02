import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext.jsx';

const NavBar = () => {
let {userData , setUserData}= useContext(UserContext)
let navigate = useNavigate()
function logOut (){
    localStorage.removeItem('userToken')
    setUserData(null)
    navigate('/login')
}

    return (
      
<div className="bg-gray-900 text-white px-8 py-4 fixed top-0 left-0 right-0 z-50 shadow-lg">
    <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
            <img
                src="src/assets/student.png"
                alt="Logo"
                className="w-10 h-10 object-cover"
            />
            <Link to="/" className="text-2xl font-bold">
                StudUp
            </Link>
        </div>
        <div className="flex space-x-8">
            {userData &&
            <>
            <Link to="/" className="hover:text-gray-300">Home</Link>
            <Link to="/activities" className="hover:text-gray-300">Student Activities</Link>
            <Link to="/events" className="hover:text-gray-300">Events</Link>
            <Link to="/opportunities" className="hover:text-gray-300">Opportunities</Link>
            <Link to="/profile" className="hover:text-gray-300">Profile</Link> 
            </>
            }

        </div>
        <div className="flex space-x-4">
            {userData ? <Link onClick={()=>logOut()} to="/login" className="hover:text-gray-300">Logout</Link> :
            <>
            <Link to="/register" className="hover:text-gray-300">Register</Link>
            <Link to="/login" className="hover:text-gray-300">Login</Link>
            </> }
   
        </div>
    </div>
</div>
    );
};

export default NavBar;
