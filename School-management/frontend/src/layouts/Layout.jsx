import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';

const Layout = () => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    // Add logout logic here
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Link to="/" className="text-xl font-bold text-gray-800">
                  School Management
                </Link>
              </div>
              <div className="hidden md:ml-6 md:flex md:space-x-8">
                <Link
                  to="/"
                  className="inline-flex items-center px-1 pt-1 text-gray-900 hover:text-gray-500"
                >
                  Dashboard
                </Link>
                <Link
                  to="/students"
                  className="inline-flex items-center px-1 pt-1 text-gray-900 hover:text-gray-500"
                >
                  Students
                </Link>
                <Link
                  to="/teachers"
                  className="inline-flex items-center px-1 pt-1 text-gray-900 hover:text-gray-500"
                >
                  Teachers
                </Link>
                <Link
                  to="/classes"
                  className="inline-flex items-center px-1 pt-1 text-gray-900 hover:text-gray-500"
                >
                  Classes
                </Link>
                <Link
                  to="/subjects"
                  className="inline-flex items-center px-1 pt-1 text-gray-900 hover:text-gray-500"
                >
                  Subjects
                </Link>
              </div>
            </div>
            <div className="flex items-center">
              <button
                onClick={handleLogout}
                className="ml-4 px-4 py-2 rounded-md text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <Outlet />
      </main>

      <footer className="bg-white shadow-lg mt-8">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 text-sm">
            © 2024 School Management System. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
