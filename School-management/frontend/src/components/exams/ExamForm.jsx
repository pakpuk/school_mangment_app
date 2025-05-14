import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const ExamForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    exam_date: '',
    duration: 60,
    total_marks: 100,
    class_room_id: '',
    subject_id: '',
    status: 'scheduled'
  });

  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchClasses();
    fetchSubjects();
    if (isEditMode) {
      fetchExam();
    }
  }, [id]);

  const fetchClasses = async () => {
    try {
      const response = await axios.get('/api/classes');
      setClasses(response.data);
    } catch (err) {
      setError('Error fetching classes');
    }
  };

  const fetchSubjects = async () => {
    try {
      const response = await axios.get('/api/subjects');
      setSubjects(response.data);
    } catch (err) {
      setError('Error fetching subjects');
    }
  };

  const fetchExam = async () => {
    try {
      const response = await axios.get(`/api/exams/${id}`);
      const examData = response.data;
      setFormData({
        ...examData,
        exam_date: new Date(examData.exam_date).toISOString().slice(0, 16)
      });
    } catch (err) {
      setError('Error fetching exam data');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isEditMode) {
        await axios.put(`/api/exams/${id}`, formData);
      } else {
        await axios.post('/api/exams', formData);
      }
      navigate('/exams');
    } catch (err) {
      setError('Error saving exam');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">
        {isEditMode ? 'Edit Exam' : 'Create New Exam'}
      </h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="max-w-lg">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            rows="3"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Exam Date and Time
          </label>
          <input
            type="datetime-local"
            name="exam_date"
            value={formData.exam_date}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Duration (minutes)
          </label>
          <input
            type="number"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            required
            min="1"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Total Marks
          </label>
          <input
            type="number"
            name="total_marks"
            value={formData.total_marks}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            required
            min="1"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Class
          </label>
          <select
            name="class_room_id"
            value={formData.class_room_id}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            required
          >
            <option value="">Select a class</option>
            {classes.map(cls => (
              <option key={cls.id} value={cls.id}>
                {cls.name} - {cls.section}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Subject
          </label>
          <select
            name="subject_id"
            value={formData.subject_id}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            required
          >
            <option value="">Select a subject</option>
            {subjects.map(subject => (
              <option key={subject.id} value={subject.id}>
                {subject.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Status
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            required
          >
            <option value="scheduled">Scheduled</option>
            <option value="ongoing">Ongoing</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {loading ? 'Saving...' : 'Save Exam'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/exams')}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ExamForm; 