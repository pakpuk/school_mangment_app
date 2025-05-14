import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const ClassForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;

  const [formData, setFormData] = useState({
    name: '',
    section: '',
    capacity: '',
    academic_year: '',
    description: '',
    teacher_ids: [],
    subject_ids: [],
  });

  const [teachers, setTeachers] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTeachers();
    fetchSubjects();
    if (isEditMode) {
      fetchClass();
    }
  }, [id]);

  const fetchTeachers = async () => {
    try {
      const response = await axios.get('/api/teachers');
      setTeachers(response.data);
    } catch (err) {
      setError('Error fetching teachers');
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

  const fetchClass = async () => {
    try {
      const response = await axios.get(`/api/classes/${id}`);
      const classData = response.data;
      setFormData({
        ...classData,
        teacher_ids: classData.teachers.map(t => t.id),
        subject_ids: classData.subjects.map(s => s.id),
      });
    } catch (err) {
      setError('Error fetching class data');
    }
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    if (type === 'select-multiple') {
      const selectedOptions = Array.from(e.target.selectedOptions).map(option => Number(option.value));
      setFormData(prev => ({
        ...prev,
        [name]: selectedOptions
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isEditMode) {
        await axios.put(`/api/classes/${id}`, formData);
      } else {
        await axios.post('/api/classes', formData);
      }
      navigate('/classes');
    } catch (err) {
      setError('Error saving class');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">
        {isEditMode ? 'Edit Class' : 'Add New Class'}
      </h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="max-w-lg">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Section
          </label>
          <input
            type="text"
            name="section"
            value={formData.section}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Capacity
          </label>
          <input
            type="number"
            name="capacity"
            value={formData.capacity}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            required
            min="1"
            max="100"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Academic Year
          </label>
          <input
            type="text"
            name="academic_year"
            value={formData.academic_year}
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
            Teachers
          </label>
          <select
            multiple
            name="teacher_ids"
            value={formData.teacher_ids}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            size="5"
          >
            {teachers.map(teacher => (
              <option key={teacher.id} value={teacher.id}>
                {teacher.name} - {teacher.subject_specialization}
              </option>
            ))}
          </select>
          <p className="text-sm text-gray-500 mt-1">Hold Ctrl/Cmd to select multiple</p>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Subjects
          </label>
          <select
            multiple
            name="subject_ids"
            value={formData.subject_ids}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            size="5"
          >
            {subjects.map(subject => (
              <option key={subject.id} value={subject.id}>
                {subject.name}
              </option>
            ))}
          </select>
          <p className="text-sm text-gray-500 mt-1">Hold Ctrl/Cmd to select multiple</p>
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {loading ? 'Saving...' : 'Save Class'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/classes')}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ClassForm; 