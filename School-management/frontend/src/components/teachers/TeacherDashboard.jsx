import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TeacherDashboard = () => {
  const [stats, setStats] = useState({
    totalClasses: 0,
    totalStudents: 0,
    upcomingExams: [],
    recentAssignments: []
  });

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const response = await axios.get('/api/teacher/dashboard-stats');
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Teacher Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold">Total Classes</h2>
          <p className="text-3xl font-bold text-blue-600">{stats.totalClasses}</p>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold">Total Students</h2>
          <p className="text-3xl font-bold text-green-600">{stats.totalStudents}</p>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard; 