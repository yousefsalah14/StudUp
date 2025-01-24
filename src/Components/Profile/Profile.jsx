/* eslint-disable no-unused-vars */
import { DocumentIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { ChevronDownIcon } from '@heroicons/react/16/solid'
import { useFormik } from "formik";
import * as yup from "yup";

import {jwtDecode} from "jwt-decode";
import axios from "axios";
import { useEffect } from 'react';
export default function Profile() { 
const token = localStorage.getItem('userToken')

  const userInfo = token ? jwtDecode(token) : {}
console.log(jwtDecode(token));


  const formik = useFormik({
    initialValues: {
      UserName: userInfo?.UserName || "",
      contactEmail:"",
      firstName: "",
      lastName: "",
      city: "",
      governorate: "",
      university: "",
      faculty: "",
      field: "",
      birthDate: "",
      contactPhoneNumber: "",
      cv: null, // For file upload
    },
    validationSchema: yup.object().shape({
      UserName: yup.string().required("Username is required"),
      contactEmail: yup.string().email("Invalid email").required("Email is required"),
      firstName: yup.string().required("First name is required"),
      lastName: yup.string().required("Last name is required"),
      city: yup.string().required("City is required"),
      governorate: yup.string().required("Governorate is required"),
      university: yup.string().required("University is required"),
      faculty: yup.string().required("Faculty is required"),
      field: yup.string().required("Field is required"),
      birthDate: yup.date().required("Birth date is required"),
      contactPhoneNumber: yup
        .string()
        .matches(/^\d+$/, "Phone number must be numeric")
        .required("Phone number is required"),
    }),
    onSubmit: async (values) => {
      try {
        const payload = { ...values, cv: undefined }; // Exclude file upload for now
        await axios.put("https://studgov1.runasp.net/api/Student", payload,
          {
            headers: {
              Authorization: `${token}`, 
            },
          });
        alert("Profile updated successfully!");
      } catch (error) {
        console.error("Error updating profile", error);
        alert("Failed to update profile");
      }
    },
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("https://studgov1.runasp.net/profile", {
          headers: {
            Authorization:`${token}`, // No Bearer prefix
          },
        });
        console.log(response.data);
  
        // Uncomment the next line to update Formik values
        formik.setValues((prevValues) => ({
          ...prevValues,
          ...response.data, // Update formik values with the fetched data
        }));
      } catch (error) {
        console.error("Error fetching user data", error);
        console.log(token);
      }
    };
  
    fetchUserData();
  }, [token]);
  

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 mt-8 ">
   <div className="mt-4 flex items-center  gap-x-3">
  <div className="mt-2 flex items-center gap-x-3 w-[20%] mb-5 ">
  <img
        src="src/assets/default-avatar-profile.jpg" 
        alt="Profile"
        className="w-[50%] h-full object-cover border-5 rounded-full"
      />
    <button
      type="button"
      className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
    >
      Change
    </button>
  </div>
</div>



    <form>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className=" font-semibold text-gray-900 text-3xl">Profile</h2>
          <p className="mt-1 text-sm/6 text-gray-600">
            This information will be displayed publicly so be careful what you share.
          </p>


          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label htmlFor="username" className="block text-sm font-medium text-gray-900">
                  Username
                </label>
                <input
                  id="UserName"
                  name="UserName"
                  type="text"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  onChange={formik.handleChange}
                  value={formik.values.UserName}
                />
                {formik.errors.UserName && <p className="text-red-500">{formik.errors.UserName}</p>}
              </div>


            <div className="col-span-full">
              <label htmlFor="cover-photo" className="block text-sm/6 font-medium text-gray-900">
                CV
              </label>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                  <DocumentIcon aria-hidden="true" className="mx-auto size-12 text-gray-300" />
                  <div className="mt-4 flex text-sm/6 text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                    >
                      <span>Upload a file</span>
                      <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs/5 text-gray-600">file up to 10MB</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base/7 font-semibold text-gray-900">Personal Information</h2>
          <p className="mt-1 text-sm/6 text-gray-600">Use a permanent address where you can receive mail.</p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="firstName" className="block text-sm/6 font-medium text-gray-900">
                First name
              </label>
              <div className="mt-2">
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  autoComplete="given-name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.firstName }
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
              {formik.errors.firstName && <p className="text-red-500">{formik.errors.firstName}</p>}
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="lastName" className="block text-sm/6 font-medium text-gray-900">
                Last name
              </label>
              <div className="mt-2">
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  autoComplete="family-name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.lastName }
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
              {formik.errors.lastName && <p className="text-red-500">{formik.errors.lastName}</p>}
            </div>

            <div className="sm:col-span-4">
              <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="contactEmail"
                  name="contactEmail"
                  type="contactEmail"
                  autoComplete="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.contactEmail }
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
              {formik.errors.contactEmail && <p className="text-red-500">{formik.errors.contactEmail}</p>}
            </div>


            <div className="sm:col-span-3 sm:col-start-1">
              <label htmlFor="city" className="block text-sm/6 font-medium text-gray-900">
                City
              </label>
              <div className="mt-2">
                <input
                  id="city"
                  name="city"
                  type="text"
                  autoComplete="address-level2"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.city }
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
              {formik.errors.city && <p className="text-red-500">{formik.errors.city}</p>}
            </div>
            <div className="sm:col-span-3 ">
              <label htmlFor="governorate" className="block text-sm/6 font-medium text-gray-900">
              Governorate
              </label>
              <div className="mt-2">
                <input
                  id="governorate"
                  name="cigovernoratety"
                  type="text"
                  autoComplete="address-level2"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>


<div className="col-span-2">
              <label htmlFor="university" className="block text-sm/6 font-medium text-gray-900">
              University
              </label>
              <div className="mt-2">
                <input
                  id="university"
                  name="university"
                  type="text"
                  autoComplete="university"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="faculty" className="block text-sm/6 font-medium text-gray-900">
              Faculty
              </label>
              <div className="mt-2">
                <input
                  id="faculty"
                  name="faculty"
                  type="text"
                  autoComplete="faculty"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="field" className="block text-sm/6 font-medium text-gray-900">
              Field
              </label>
              <div className="mt-2">
                <input
                  id="field"
                  name="field"
                  type="text"
                  autoComplete="field"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
  <label htmlFor="birthDate" className="block text-sm font-medium text-gray-900">
    Birth Date
  </label>
  <div className="mt-2">
    <input
      id="birthDate"
      name="birthDate"
      type="date"
      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
    />
  </div>
</div>
<div className="sm:col-span-3 ">
              <label htmlFor="contactPhoneNumber" className="block text-sm/6 font-medium text-gray-900">
              Phone 
              </label>
              <div className="mt-2">
                <input
                  id="contactPhoneNumber"
                  name="contactPhoneNumber"
                  type="text"
                  autoComplete="address-level2"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base/7 font-semibold text-gray-900">Notifications</h2>
          <p className="mt-1 text-sm/6 text-gray-600">
            We ll always let you know about important changes, but you pick what else you want to hear about.
          </p>

          <div className="mt-10 space-y-10">
            <fieldset>
              <legend className="text-sm/6 font-semibold text-gray-900">By email</legend>
              <div className="mt-6 space-y-6">
                <div className="flex gap-3">
                  <div className="flex h-6 shrink-0 items-center">
                    <div className="group grid size-4 grid-cols-1">
                      <input
                        defaultChecked
                        id="comments"
                        name="comments"
                        type="checkbox"
                        aria-describedby="comments-description"
                        className="col-start-1 row-start-1 appearance-none rounded border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                      />
                      <svg
                        fill="none"
                        viewBox="0 0 14 14"
                        className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-[:disabled]:stroke-gray-950/25"
                      >
                        <path
                          d="M3 8L6 11L11 3.5"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="opacity-0 group-has-[:checked]:opacity-100"
                        />
                        <path
                          d="M3 7H11"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="opacity-0 group-has-[:indeterminate]:opacity-100"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="text-sm/6">
                    <label htmlFor="comments" className="font-medium text-gray-900">
                      Events
                    </label>
                    <p id="comments-description" className="text-gray-500">
                      Get Notified When Event Published 
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex h-6 shrink-0 items-center">
                    <div className="group grid size-4 grid-cols-1">
                      <input
                        id="candidates"
                        name="candidates"
                        type="checkbox"
                        aria-describedby="candidates-description"
                        className="col-start-1 row-start-1 appearance-none rounded border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                      />
                      <svg
                        fill="none"
                        viewBox="0 0 14 14"
                        className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-[:disabled]:stroke-gray-950/25"
                      >
                        <path
                          d="M3 8L6 11L11 3.5"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="opacity-0 group-has-[:checked]:opacity-100"
                        />
                        <path
                          d="M3 7H11"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="opacity-0 group-has-[:indeterminate]:opacity-100"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="text-sm/6">
                    <label htmlFor="candidates" className="font-medium text-gray-900">
                      Candidates
                    </label>
                    <p id="candidates-description" className="text-gray-500">
                      Get notified when a candidate applies for a job.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex h-6 shrink-0 items-center">
                    <div className="group grid size-4 grid-cols-1">
                      <input
                        id="offers"
                        name="offers"
                        type="checkbox"
                        aria-describedby="offers-description"
                        className="col-start-1 row-start-1 appearance-none rounded border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                      />
                      <svg
                        fill="none"
                        viewBox="0 0 14 14"
                        className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-[:disabled]:stroke-gray-950/25"
                      >
                        <path
                          d="M3 8L6 11L11 3.5"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="opacity-0 group-has-[:checked]:opacity-100"
                        />
                        <path
                          d="M3 7H11"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="opacity-0 group-has-[:indeterminate]:opacity-100"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="text-sm/6">
                    <label htmlFor="offers" className="font-medium text-gray-900">
                      Offers
                    </label>
                    <p id="offers-description" className="text-gray-500">
                      Get notified when a candidate accepts or rejects an offer.
                    </p>
                  </div>
                </div>
              </div>
            </fieldset>

            
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button type="button" className="text-sm/6 font-semibold text-gray-900">
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>
    </form>  
      </div>
  )
}
