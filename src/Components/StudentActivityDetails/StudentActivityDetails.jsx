/* eslint-disable no-unused-vars */

import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function StudentActivityDetails() {
  let { id } = useParams();
  const [studentActivityDetails, setStudentActivityDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function getStudentActivity(id) {
    try {
      setLoading(true);
      const { data } = await axios.get(`https://studgov1.runasp.net/api/StudentActivity/${id}`);
      setStudentActivityDetails(data.data);
    } catch (err) {
      setError("Failed to load Student Activity details. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getStudentActivity(id);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <p>Loading student activity details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <p>{error}</p>
      </div>
    );
  }

  const { name, contactEmail, role, pictureUrl, lastActivity, foundingDate, description, tags, biography } =
    studentActivityDetails;

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-5 py-10">
        {/* Header Section */}
        <h1 className="text-4xl font-bold mt-10 mb-5">{name}</h1>
        <div className="flex flex-wrap md:flex-nowrap items-start bg-gray-800 rounded-lg shadow-lg p-5">
          {/* Image Section */}
          <div className="w-full md:w-1/3 p-4">
            <img
              src={pictureUrl}
              alt={name}
              className="w-full h-auto object-cover rounded-lg border-2 border-gray-700"
            />
          </div>

          {/* Details Section */}
          <div className="w-full md:w-2/3 p-5">
            <h2 className="text-2xl font-semibold mb-4">{role}</h2>
            <p className="mb-6 text-gray-300">{biography || "No description available."}</p>
            <h3 className="text-xl font-medium">Contact: {contactEmail || "Email not available"}</h3>
            <div className="flex justify-between my-4 text-gray-400">
              <h3 className="text-lg font-semibold">{lastActivity}</h3>
              <h3>{new Date(foundingDate).toLocaleString()}</h3>
            </div>
            <div className="flex justify-between gap-4 mt-[200px] ">
            <button className="btn w-full bg-blue-600 text-white rounded-lg p-3 mt-4 hover:bg-blue-700">
              Follow
            </button>
            <button className="btn w-full bg-blue-600 text-white rounded-lg p-3 mt-4 hover:bg-blue-700">
              Chat
            </button>

            </div>
  
          </div>
        </div>

        {/* Tags Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-3">Tags</h2>
          <div className="flex flex-wrap gap-2">
            {tags && tags.length > 0 ? (
              tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-blue-800 text-white text-sm px-3 py-1 rounded-lg"
                >
                  {tag}
                </span>
              ))
            ) : (
              <p className="text-gray-400">No tags available.</p>
            )}
          </div>
        </div>

        {/* Activities Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-3">Activities</h2>

        </div>
      </div>
    </div>
  );
}

export default StudentActivityDetails;
