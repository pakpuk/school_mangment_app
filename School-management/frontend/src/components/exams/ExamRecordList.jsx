import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ExamRecordList = () => {
  const { examId } = useParams();
  const [exam, setExam] = useState(null);
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchExamAndRecords();
  }, [examId]);

  const fetchExamAndRecords = async () => {
    try {
      const [examResponse, recordsResponse] = await Promise.all([
        axios.get(`/api/exams/${examId}`),
        axios.get(`/api/exams/${examId}/records`)
      ]);
      setExam(examResponse.data);
      setRecords(recordsResponse.data);
      setLoading(false);
    } catch (err) {
      setError('Error fetching exam records');
      setLoading(false);
    }
  };

  const handleStatusChange = async (recordId, newStatus) => {
    try {
      await axios.patch(`/api/exam-records/${recordId}`, { status: newStatus });
      setRecords(records.map(record => 
        record.id === recordId ? { ...record, status: newStatus } : record
      ));
    } catch (err) {
      setError('Error updating record status');
    }
  };

  const handleMarksUpdate = async (recordId, marks) => {
    try {
      await axios.patch(`/api/exam-records/${recordId}`, { 
        marks_obtained: marks,
        status: 'graded'
      });
      setRecords(records.map(record => 
        record.id === recordId ? { 
          ...record, 
          marks_obtained: marks,
          status: 'graded'
        } : record
      ));
    } catch (err) {
      setError('Error updating marks');
    }
  };

  const getStatusBadgeColor = (status) => {
    const colors = {
      absent: 'bg-red-100 text-red-800',
      present: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      graded: 'bg-blue-100 text-blue-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!exam) return <div>Exam not found</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">{exam.title} - Records</h1>
        <div className="text-gray-600">
          <p>Class: {exam.class_room.name}</p>
          <p>Subject: {exam.subject.name}</p>
          <p>Total Marks: {exam.total_marks}</p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b">Student</th>
              <th className="px-6 py-3 border-b">Status</th>
              <th className="px-6 py-3 border-b">Marks</th>
              <th className="px-6 py-3 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record) => (
              <tr key={record.id}>
                <td className="px-6 py-4 border-b">
                  {record.student.name}
                </td>
                <td className="px-6 py-4 border-b">
                  <span className={`px-2 py-1 rounded-full text-sm ${getStatusBadgeColor(record.status)}`}>
                    {record.status}
                  </span>
                </td>
                <td className="px-6 py-4 border-b">
                  {record.status === 'graded' ? (
                    <span>{record.marks_obtained} / {exam.total_marks}</span>
                  ) : (
                    <input
                      type="number"
                      className="border rounded px-2 py-1 w-20"
                      min="0"
                      max={exam.total_marks}
                      placeholder="Marks"
                      onBlur={(e) => {
                        const marks = parseFloat(e.target.value);
                        if (!isNaN(marks) && marks >= 0 && marks <= exam.total_marks) {
                          handleMarksUpdate(record.id, marks);
                        }
                      }}
                    />
                  )}
                </td>
                <td className="px-6 py-4 border-b">
                  <select
                    value={record.status}
                    onChange={(e) => handleStatusChange(record.id, e.target.value)}
                    className="border rounded px-2 py-1"
                  >
                    <option value="pending">Pending</option>
                    <option value="absent">Absent</option>
                    <option value="present">Present</option>
                    <option value="graded">Graded</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExamRecordList; 