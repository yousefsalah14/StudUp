/* eslint-disable no-unused-vars */
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function StudentActivityHome() {
  const [organizations, setOrganizations] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredOrganizations, setFilteredOrganizations] = useState([]);

  // Fetch student activities
  async function getStudentActivities() {
    try {
      const { data } = await axios.get("http://localhost:3000/student-activity");

      const studentActivities = data.StudentActivities || [];
      setOrganizations(studentActivities);
      setFilteredOrganizations(studentActivities);
    } catch (error) {
      console.error("Error fetching student activities:", error);
    }
  }

  useEffect(() => {
    getStudentActivities();
  }, []);

  // Handle search
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    if (query === "") {
      setFilteredOrganizations(organizations);
    } else {
      const filtered = organizations.filter(
        (org) =>
          org.name?.toLowerCase().includes(query) ||
          org.email?.toLowerCase().includes(query) ||
          org.role?.toLowerCase().includes(query) ||
          org.activities?.toLowerCase().includes(query)
      );
      setFilteredOrganizations(filtered);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 via-gray-800 to-black text-white flex flex-col gap-8 items-center justify-start pt-9 mt-11 px-4">
      {/* Hero Section */}
      <div className="relative w-full bg-gray-800 overflow-hidden rounded-lg shadow-lg">
      <img
          src="src/assets/download.jpg"
          alt="Hero Background"
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        />
        <div className="relative z-10 flex flex-col items-center text-center py-20 px-6 space-y-6">
          <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight text-white">
            Unlock Skills with Student Activities
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 max-w-2xl">
            Join vibrant student organizations, build skills, and create lasting memories while connecting with peers.
          </p>
          {/* Search Bar */}
          <div className="relative w-full max-w-xl">
            <div className="flex items-center bg-gray-800 rounded-lg shadow-xl overflow-hidden">
              <input
                type="text"
                placeholder="Search organizations..."
                value={searchQuery}
                onChange={handleSearch}
                className="w-full bg-transparent text-white placeholder-gray-400 focus:outline-none py-3 px-4"
              />
              {searchQuery && (
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setFilteredOrganizations(organizations);
                  }}
                  className="px-4 py-3 text-gray-400 hover:text-gray-300"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Organization List */}
      <div className="w-full max-w-4xl px-6">
        <ul role="list" className="divide-y divide-gray-700 space-y-6">
          {filteredOrganizations.length > 0 ? (
            filteredOrganizations.map((org) => (
              <li
                key={org.id}
                className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-y-4 sm:gap-y-0 py-4 px-6 bg-gray-800 rounded-lg hover:bg-gray-700"
              >
                <Link
                  to={`/studentactivity/${org._id}`}
                  className="w-full flex items-center gap-x-4"
                >
                  <img
                    alt={org.name}
                    src={org.imageUrl || "https://via.placeholder.com/64"}
                    className="w-16 h-16 rounded-full"
                  />
                  <div className="flex flex-col">
                    <p className="text-lg font-semibold">{org.name}</p>
                    <p className="text-sm text-gray-400">{org.email}</p>
                    <p className="text-sm text-gray-400">
                      Role: <span>{org.role}</span>
                    </p>
                    <p className="text-sm text-gray-400">
                      Activities: <span>{org.activities}</span>
                    </p>
                  </div>
                </Link>
                <div>
                  {org.lastActivity && (
                    <p className="text-sm text-gray-400">
                      Last activity: <time>{org.lastActivity}</time>
                    </p>
                  )}
                </div>
              </li>
            ))
          ) : (
            <p className="text-gray-400 text-center py-4">No results found.</p>
          )}
        </ul>
      </div>
    </div>
  );
}

export default StudentActivityHome;
