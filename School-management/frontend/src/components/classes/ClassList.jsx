import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ClassList = () => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      const response = await axios.get('/api/classes');
      setClasses(response.data);
      setLoading(false);
    } catch (err) {
      setError('Error fetching classes');
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this class?')) {
      try {
        await axios.delete(`/api/classes/${id}`);
        setClasses(classes.filter(cls => cls.id !== id));
      } catch (err) {
        setError('Error deleting class');
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Classes</h1>
        <Link
          to="/classes/create"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add New Class
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b">Name</th>
              <th className="px-6 py-3 border-b">Section</th>
              <th className="px-6 py-3 border-b">Capacity</th>
              <th className="px-6 py-3 border-b">Academic Year</th>
              <th className="px-6 py-3 border-b">Teachers</th>
              <th className="px-6 py-3 border-b">Students</th>
              <th className="px-6 py-3 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {classes.map((cls) => (
              <tr key={cls.id}>
                <td className="px-6 py-4 border-b">{cls.name}</td>
                <td className="px-6 py-4 border-b">{cls.section}</td>
                <td className="px-6 py-4 border-b">{cls.capacity}</td>
                <td className="px-6 py-4 border-b">{cls.academic_year}</td>
                <td className="px-6 py-4 border-b">
                  {cls.teachers?.length || 0} teachers
                </td>
                <td className="px-6 py-4 border-b">
                  {cls.students?.length || 0} students
                </td>
                <td className="px-6 py-4 border-b">
                  <Link
                    to={`/classes/edit/${cls.id}`}
                    className="text-blue-500 hover:text-blue-700 mr-4"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(cls.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClassList; 