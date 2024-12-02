const organizations = [
    {
      name: 'IEEE',
      email: 'contact@ieee.org',
      role: 'Student Branch',
      imageUrl:
        'src/assets/ieeehsb.png',
      lastActivity: '1 day ago',
      lastActivityDateTime: '2023-01-22T12:30Z',
      activities: 'Hosting webinars, workshops, and competitions for students.',
    },
    {
      name: 'MSP (Microsoft Student Partners)',
      email: 'msp@microsoft.com',
      role: 'Student Program',
      imageUrl:
        'src/assets/msp.png',
      lastActivity: '2 hours ago',
      lastActivityDateTime: '2023-01-23T14:00Z',
      activities: 'Collaborating with students for Microsoft technology advocacy and events.',
    },
    {
        name: 'ICPC',
        email: 'icpc@acm.org',
        role: 'Professional Association',
        imageUrl: 'src/assets/icpc.png', // Add a valid image URL if available, or use a placeholder
        lastActivity: '5 hours ago',
        lastActivityDateTime: '2023-01-23T08:15Z',
        activities: 'Organizing hackathons, coding competitions, and networking events.',
      },
    {
      name: 'Google Developer Student Clubs',
      email: 'gdsclogin@google.com',
      role: 'Developer Community',
      imageUrl:
        'src/assets/gdsc.png',
      lastActivity: 'Just now',
      lastActivityDateTime: '2023-01-23T15:10Z',
      activities: 'Building projects using Google technologies and hosting coding events.',
    },
    {
      name: '180 degree',
      email: 'contact@180degree.org',
      role: 'Student Activity',
      imageUrl:
        'src/assets/180.png',
      lastActivity: '3 days ago',
      lastActivityDateTime: '2023-01-20T09:00Z',
      activities: 'Organizing community service and humanitarian activities for students.',
    },
  ]
  function StudentActivityHome() {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex flex-col gap-8 items-center justify-start pt-9 mt-11 px-4">
        {/* Header Section */}
        <div className="text-center max-w-4xl px-6 py-12">
          <h1 className="text-3xl font-bold tracking-tight">Student Activities</h1>
          <p className="mt-2 text-gray-400 text-sm">
            Explore and engage with student organizations, events, and opportunities!
          </p>
        </div>
  
        {/* Organization List Section */}
        <div className="w-full max-w-4xl px-6">
          <ul role="list" className="divide-y divide-gray-700 space-y-6">
            {organizations.map((org) => (
              <li
                key={org.email}
                className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-y-4 sm:gap-y-0 py-4 px-6 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
              >
                {/* Organization Logo and Details */}
                <div className="flex items-center gap-x-4">
                  <img
                    alt={org.name}
                    src={org.imageUrl || 'https://via.placeholder.com/64'}
                    className="w-16 h-16 rounded-full bg-gray-50"
                  />
                  <div className="flex flex-col">
                    <p className="text-lg font-semibold">{org.name}</p>
                    <p className="text-sm text-gray-400">{org.email}</p>
                    <p className="text-sm text-gray-400">
                      Role: <span className="text-gray-300">{org.role}</span>
                    </p>
                    <p className="text-sm text-gray-400">
                      Activities: <span className="text-gray-300">{org.activities}</span>
                    </p>
                  </div>
                </div>
  
                {/* Last Activity */}
                <div className="text-right sm:text-left sm:flex sm:flex-col sm:items-end">
                  {org.lastActivity && (
                    <p className="text-sm text-gray-400">
                      Last activity:{" "}
                      <time dateTime={org.lastActivityDateTime}>
                        {org.lastActivity}
                      </time>
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
  
  
export default StudentActivityHome  