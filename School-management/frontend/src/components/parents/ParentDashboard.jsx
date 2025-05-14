import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ParentDashboard = () => {
  const [children, setChildren] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchChildren();
  }, []);

  const fetchChildren = async () => {
    try {
      const response = await axios.get('/api/parent/children');
      setChildren(response.data);
      setLoading(false);
    } catch (err) {
      setError('Error fetching children data');
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Parent Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {children.map(child => (
          <div key={child.id} className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">{child.name}</h2>
            <div className="space-y-2">
              <p>
                <span className="font-medium">Class:</span>{' '}
                {child.current_class?.name || 'Not Assigned'}
              </p>
              <p>
                <span className="font-medium">Roll Number:</span> {child.roll_number}
              </p>
              <div className="mt-4 space-y-2">
                <Link
                  to={`/parent/children/${child.id}/attendance`}
                  className="block bg-blue-50 text-blue-700 px-4 py-2 rounded hover:bg-blue-100"
                >
                  View Attendance
                </Link>
                <Link
                  to={`/parent/children/${child.id}/exams`}
                  className="block bg-green-50 text-green-700 px-4 py-2 rounded hover:bg-green-100"
                >
                  View Exam Results
                </Link>
                <Link
                  to={`/parent/children/${child.id}/schedule`}
                  className="block bg-purple-50 text-purple-700 px-4 py-2 rounded hover:bg-purple-100"
                >
                  View Schedule
                </Link>
                <Link
                  to={`/parent/children/${child.id}/fees`}
                  className="block bg-yellow-50 text-yellow-700 px-4 py-2 rounded hover:bg-yellow-100"
                >
                  View Fees
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {children.length === 0 && (
        <div className="text-center text-gray-500 mt-8">
          No children found. Please contact the school administration.
        </div>
      )}
    </div>
  );
};

export default ParentDashboard; 