import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

const ExamList = () => {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchExams();
  }, []);

  const fetchExams = async () => {
    try {
      const response = await axios.get('/api/exams');
      setExams(response.data);
      setLoading(false);
    } catch (err) {
      setError('Error fetching exams');
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this exam?')) {
      try {
        await axios.delete(`/api/exams/${id}`);
        setExams(exams.filter(exam => exam.id !== id));
      } catch (err) {
        setError('Error deleting exam');
      }
    }
  };

  const getStatusBadgeColor = (status) => {
    const colors = {
      scheduled: 'bg-yellow-100 text-yellow-800',
      ongoing: 'bg-blue-100 text-blue-800',
      completed: 'bg-green-100 text-green-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Exams</h1>
        <Link
          to="/exams/create"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add New Exam
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b">Title</th>
              <th className="px-6 py-3 border-b">Class</th>
              <th className="px-6 py-3 border-b">Subject</th>
              <th className="px-6 py-3 border-b">Date</th>
              <th className="px-6 py-3 border-b">Duration</th>
              <th className="px-6 py-3 border-b">Status</th>
              <th className="px-6 py-3 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {exams.map((exam) => (
              <tr key={exam.id}>
                <td className="px-6 py-4 border-b">{exam.title}</td>
                <td className="px-6 py-4 border-b">{exam.class_room.name}</td>
                <td className="px-6 py-4 border-b">{exam.subject.name}</td>
                <td className="px-6 py-4 border-b">
                  {format(new Date(exam.exam_date), 'PPp')}
                </td>
                <td className="px-6 py-4 border-b">{exam.duration} minutes</td>
                <td className="px-6 py-4 border-b">
                  <span className={`px-2 py-1 rounded-full text-sm ${getStatusBadgeColor(exam.status)}`}>
                    {exam.status}
                  </span>
                </td>
                <td className="px-6 py-4 border-b">
                  <Link
                    to={`/exams/${exam.id}/records`}
                    className="text-blue-500 hover:text-blue-700 mr-4"
                  >
                    View Records
                  </Link>
                  <Link
                    to={`/exams/edit/${exam.id}`}
                    className="text-blue-500 hover:text-blue-700 mr-4"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(exam.id)}
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

export default ExamList; 