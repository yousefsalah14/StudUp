/* eslint-disable no-unused-vars */
import axios from "axios";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import { FiCommand } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import * as Yup from 'yup'
import { UserContext } from "../../Context/UserContext.jsx";

function Login() {
    const [apiError,setApiError]=useState(null)
    const [loading,setLoading]=useState(false)
    let {setUserData} = useContext(UserContext)
    let navigate = useNavigate()
     async function handleLogin(values) {
      
      try {
        setLoading(true)
        let {data} = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', values)
        localStorage.setItem('userToken',data.token)
        console.log(data);
        navigate("/")
        setUserData(data.token)
        setLoading(false)
      } catch (error) {
        setApiError(error.response.data.message)
        setLoading(false)
      }
      

    }
    let validationSchema  = Yup.object().shape({
      email : Yup.string().email("email invalid ").required("email is required"),
      password : Yup.string().required("Password is required"),
    })
    let formik = useFormik({
        initialValues:{
            email:'',
            password:''
        }, validationSchema ,
        onSubmit: handleLogin
    })
  return (

    <div className="pt-8 mx-auto w-1/2 mt-11 ">
        <h2 className="text-3xl font-semibold py-6 mt-8">Login Now !</h2>
      <form onSubmit={formik.handleSubmit} className="">
{  apiError &&    <div className="p-3 mb-4 text-sm text-red-800 rounded-xl bg-red-50 dark:text-red-400" role="alert">
      {apiError}
</div>}
       
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="email"
            name="email"
            id="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=""
          />
          <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Email
          </label>
        </div>
        {formik.errors.email && formik.touched.email &&<div className="p-3 mb-4 text-sm text-red-800 rounded-xl bg-red-50 dark:text-red-400" role="alert">
      {formik.errors.email}
</div>}
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="password"
            name="password"
            id="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=""
          />
          <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Password
          </label>
        </div>
        {formik.errors.password && formik.touched.password &&<div className="p-3 mb-4 text-sm text-red-800 rounded-xl bg-red-50 dark:text-red-400" role="alert">
      {formik.errors.password}
</div>}
    
{loading ?<button
  type="button"
  className="text-white bg-gray-900 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg w-full sm:w-auto px-3 py-1.5 text-center dark:bg-gray-900 dark:hover:bg-blue-700 dark:focus:ring-gray-900"
>
<FiCommand className="loading-icon" />
</button> : <button
          type="submit"
          className="text-white bg-gray-900 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-gray-900 dark:hover:bg-blue-700 dark:focus:ring-gray-900"
        >
          Submit
        </button> }
       
        

      </form>
    </div>

  );
}

export default Login;
