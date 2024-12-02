
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css'
import Layout from './Components/Layout/Layout.jsx'
import Home from './Components/Home/Home.jsx';
import Register from './Components/Register/Register.jsx';
import Login from './Components/Login/Login.jsx';
import Profile from './Components/Profile/Profile.jsx';
import NotFound from './Components/NotFound/NotFound.jsx';
import UserContextProvider from './Context/UserContext.jsx';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute.jsx';
let routes = createBrowserRouter([
  {
    path: '', 
    element: <Layout />,
    children: [
      { index: true, element: <ProtectedRoute><Home /></ProtectedRoute> }, 
      { path: 'register', element: <Register />  },
      { path: 'login', element:<Login />  },
      { path: 'profile', element: <ProtectedRoute><Profile /></ProtectedRoute> },
      { path: '*', element: <ProtectedRoute><NotFound /></ProtectedRoute> }, 
    ],
  },
]);
function App() {


  return (
    
    <UserContextProvider>
    <RouterProvider router={routes}></RouterProvider>
    </UserContextProvider>

  )
}

export default App
