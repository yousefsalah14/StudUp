
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css'
import Layout from './Components/Layout/Layout.jsx'
import Home from './Components/Home/Home.jsx';
import Register from './Components/Register/Register.jsx';
import Login from './Components/Login/Login.jsx';
import Profile from './Components/Profile/Profile.jsx';
import NotFound from './Components/NotFound/NotFound.jsx';
let routes = createBrowserRouter([
  {
    path: '', 
    element: <Layout />,
    children: [
      { index: true, element: <Home /> }, // Default route (root/home)
      { path: 'register', element: <Register /> },
      { path: 'login', element: <Login /> },
      { path: 'profile', element: <Profile /> },
      { path: '*', element: <NotFound /> }, // Catch-all route for 404 pages
    ],
  },
]);
function App() {


  return (
    <>
    <RouterProvider router={routes}></RouterProvider>
    </>
  )
}

export default App
