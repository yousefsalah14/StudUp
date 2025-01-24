/* eslint-disable no-unused-vars */
import axios from "axios";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import { FiCommand } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import * as Yup from 'yup'
import { UserContext } from "../../Context/UserContext.jsx";

function Register() {
    const [apiError,setApiError]=useState(null)
    const [loading,setLoading]=useState(false)
    let {setUserData}= useContext(UserContext)
    let navigate = useNavigate()
    async function handleRegister(values) {
      try {
        setLoading(true);
        const { data } = await axios.post(
          "https://studgov1.runasp.net/api/Auth/StudentRegister",
          values
        );
    
        // Redirect to home
        navigate("/login");
      } catch (error) {
        // Handle API errors
        setApiError(error.response.data.errors[0]|| "An error occurred");
      } finally {
        setLoading(false);
      }
    }
    
    // Validation Schema
    let validationSchema = Yup.object().shape({
      username: Yup.string()
        .min(3, "Name Length Must Be Greater Than 3")
        .required("Name is Required"),
      email: Yup.string().email("Email is invalid").required("Email is Required"),
      password: Yup.string().required("Password is Required"),
    });
    
    // Formik Configuration
    let formik = useFormik({
      initialValues: {
        username: "",
        email: "",
        password: ""
      },
      validationSchema,
      onSubmit: handleRegister,
    });
    
  return (
 
    <div className="pt-8 mx-auto w-1/2 mt-11">
        <h2 className="text-3xl font-semibold py-6 mt-8">Register Now !</h2>
      <form onSubmit={formik.handleSubmit} className="">
{  apiError &&    <div className="p-3 mb-4 text-sm text-red-800 rounded-xl bg-red-50 dark:text-red-400" role="alert">
      {apiError}
</div>}
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="username"
            id="username"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.username}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=""
          />
          <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            UserName
          </label>
        </div>
        {formik.errors.username && formik.touched.username &&<div className="p-3 mb-4 text-sm text-red-800 rounded-xl bg-red-50 dark:text-red-400" role="alert">
      {formik.errors.username}
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
  className="text-white bg-gray-900 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg w-full sm:w-auto px-3 py-1.5 text-center dark:bg-gray-900 dark:hover:bg-blue-700 dark:focus:ring-gray-800"
>
<FiCommand className="loading-icon" />
</button> : <button
          type="submit"
          className="text-white bg-gray-900 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-blue-700 dark:focus:ring-gray-800"
        >
          Submit
        </button> }
       
        

      </form>
    </div>

  );
}

export default Register;
