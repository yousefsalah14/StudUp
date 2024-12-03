import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function StudentActivityDetails() {
  let { id } = useParams();
  const [studentActivityDetails, setStudentActivityDetails] = useState(null);

  async function getStudentActivity(id) {
    try {
      const { data } = await axios.get(`http://localhost:3000/student-activity/${id}`);
      setStudentActivityDetails(data.studentActivity);
    } catch (error) {
      console.error("Error fetching student activity details:", error);
    }
  }

  useEffect(() => {
    getStudentActivity(id);
  }, [id]);

  if (!studentActivityDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <p>Loading student activity details...</p>
      </div>
    );
  }

  const { name, email, role, imageUrl, lastActivity, lastActivityDateTime, activities } =
    studentActivityDetails;

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white">{name}</h1>
          <p className="mt-4 text-lg text-gray-200 max-w-2xl mx-auto">
            Discover how <span className="font-semibold">{name}</span> empowers students through{" "}
            {activities.toLowerCase()}.
          </p>
          <a
            href="#details"
            className="mt-6 inline-block bg-white text-indigo-600 font-semibold py-3 px-6 rounded-lg shadow-lg hover:bg-gray-100 transition"
          >
            Learn More
          </a>
        </div>
      </div>

      {/* Details Section */}
      <div
        id="details"
        className="p-6 flex flex-col items-center mt-8"
      >
        <div className="bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-lg">
          <div className="flex items-center gap-4">
            <img
              src={imageUrl}
              alt={name}
              className="w-16 h-16 rounded-full bg-gray-700 object-cover"
            />
            <h1 className="text-2xl font-bold">{name}</h1>
          </div>
          <div className="mt-4">
            <p className="text-lg">
              <span className="font-semibold">Role:</span> {role}
            </p>
            <p className="text-lg mt-2">
              <span className="font-semibold">Email:</span> {email}
            </p>
            <p className="text-lg mt-2">
              <span className="font-semibold">Activities:</span> {activities}
            </p>
            <p className="text-lg mt-2">
              <span className="font-semibold">Last Activity:</span> {lastActivity}
            </p>
            <p className="text-sm text-gray-400 mt-1">
              <span className="font-semibold">Last Activity DateTime:</span>{" "}
              <time dateTime={lastActivityDateTime}>{lastActivityDateTime}</time>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentActivityDetails;
