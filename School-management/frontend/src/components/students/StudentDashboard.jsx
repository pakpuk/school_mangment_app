import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StudentDashboard = () => {
  const [stats, setStats] = useState({
    currentClass: null,
    totalSubjects: 0,
    upcomingExams: [],
    recentGrades: []
  });

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const response = await axios.get('/api/student/dashboard-stats');
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Student Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold">Current Class</h2>
          <p className="text-3xl font-bold text-blue-600">{stats.currentClass?.name || 'Not Assigned'}</p>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold">Total Subjects</h2>
          <p className="text-3xl font-bold text-green-600">{stats.totalSubjects}</p>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard; 