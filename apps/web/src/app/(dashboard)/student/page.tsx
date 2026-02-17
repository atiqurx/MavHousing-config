
'use client';

import { useAuth } from '../../../context/AuthContext';

export default function StudentDashboard() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Student Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-600">Welcome, {user?.username || 'Student'}</span>
            <button 
              onClick={logout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-colors"
            >
              Logout
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Apply / Lease Status */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Lease Status</h2>
            <p className="text-gray-500 italic">No active lease found.</p>
            <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
              Apply for Housing
            </button>
          </div>

          {/* Maintenance */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Maintenance Requests</h2>
            <p className="text-gray-500 italic">No open requests.</p>
            <button className="mt-4 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
              New Request
            </button>
          </div>

          {/* Payments */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Finances</h2>
            <div className="flex justify-between items-center mb-2">
              <span>Balance Due:</span>
              <span className="font-bold text-red-600">$0.00</span>
            </div>
            <button className="mt-4 w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700">
              Make Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
