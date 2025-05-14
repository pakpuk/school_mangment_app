import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const TeacherList = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      const response = await axios.get('/api/teachers');
      setTeachers(response.data);
      setLoading(false);
    } catch (err) {
      setError('Error fetching teachers');
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this teacher?')) {
      try {
        await axios.delete(`/api/teachers/${id}`);
        setTeachers(teachers.filter(teacher => teacher.id !== id));
      } catch (err) {
        setError('Error deleting teacher');
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Teachers</h1>
        <Link
          to="/teachers/create"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add New Teacher
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b">ID</th>
              <th className="px-6 py-3 border-b">Name</th>
              <th className="px-6 py-3 border-b">Email</th>
              <th className="px-6 py-3 border-b">Specialization</th>
              <th className="px-6 py-3 border-b">Qualification</th>
              <th className="px-6 py-3 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {teachers.map((teacher) => (
              <tr key={teacher.id}>
                <td className="px-6 py-4 border-b">{teacher.id}</td>
                <td className="px-6 py-4 border-b">{teacher.name}</td>
                <td className="px-6 py-4 border-b">{teacher.email}</td>
                <td className="px-6 py-4 border-b">{teacher.subject_specialization}</td>
                <td className="px-6 py-4 border-b">{teacher.qualification}</td>
                <td className="px-6 py-4 border-b">
                  <Link
                    to={`/teachers/edit/${teacher.id}`}
                    className="text-blue-500 hover:text-blue-700 mr-4"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(teacher.id)}
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

export default TeacherList; 