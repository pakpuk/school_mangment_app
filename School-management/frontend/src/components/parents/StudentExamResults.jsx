import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const StudentExamResults = () => {
  const { studentId } = useParams();
  const [examResults, setExamResults] = useState([]);
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStudentAndResults();
  }, [studentId]);

  const fetchStudentAndResults = async () => {
    try {
      const [studentResponse, resultsResponse] = await Promise.all([
        axios.get(`/api/students/${studentId}`),
        axios.get(`/api/parent/children/${studentId}/exam-results`)
      ]);
      setStudent(studentResponse.data);
      setExamResults(resultsResponse.data);
      setLoading(false);
    } catch (err) {
      setError('Error fetching exam results');
      setLoading(false);
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

  const calculatePercentage = (obtained, total) => {
    return ((obtained / total) * 100).toFixed(1);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!student) return <div>Student not found</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Exam Results</h1>
        <div className="text-gray-600">
          <p>Student: {student.name}</p>
          <p>Class: {student.current_class?.name || 'Not Assigned'}</p>
          <p>Roll Number: {student.roll_number}</p>
        </div>
      </div>

      {examResults.length > 0 ? (
        <div className="space-y-6">
          {examResults.map(result => (
            <div key={result.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-semibold">{result.exam.title}</h2>
                  <p className="text-gray-600">{result.exam.subject.name}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm ${getStatusBadgeColor(result.status)}`}>
                  {result.status}
                </span>
              </div>

              {result.status === 'graded' && (
                <div className="mt-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Marks Obtained:</span>
                    <span className="font-semibold">
                      {result.marks_obtained} / {result.exam.total_marks}
                      <span className="text-gray-500 ml-2">
                        ({calculatePercentage(result.marks_obtained, result.exam.total_marks)}%)
                      </span>
                    </span>
                  </div>
                  {result.remarks && (
                    <div className="mt-2 text-gray-600">
                      <span className="font-medium">Remarks:</span> {result.remarks}
                    </div>
                  )}
                </div>
              )}

              <div className="mt-4 text-sm text-gray-500">
                <p>Date: {new Date(result.exam.exam_date).toLocaleDateString()}</p>
                <p>Duration: {result.exam.duration} minutes</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 mt-8">
          No exam results available yet.
        </div>
      )}
    </div>
  );
};

export default StudentExamResults; 