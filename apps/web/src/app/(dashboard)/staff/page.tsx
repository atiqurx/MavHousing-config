
'use client';

import { useAuth } from '../../../context/AuthContext';

export default function StaffDashboard() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Staff Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-600">Welcome, {user?.username || 'Staff'}</span>
            <button 
              onClick={logout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-colors"
            >
              Logout
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Applications */}
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
            <h2 className="text-xl font-semibold mb-2">Pending Applications</h2>
            <p className="text-3xl font-bold text-gray-800">0</p>
            <p className="text-sm text-gray-500">Requires review</p>
          </div>

          {/* Maintenance */}
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-yellow-500">
            <h2 className="text-xl font-semibold mb-2">Open Maintenance Tickets</h2>
            <p className="text-3xl font-bold text-gray-800">0</p>
            <p className="text-sm text-gray-500">Assigned to you</p>
          </div>
          
           {/* Occupancy */}
           <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
            <h2 className="text-xl font-semibold mb-2">Unit Occupancy</h2>
            <p className="text-3xl font-bold text-gray-800">0%</p>
            <p className="text-sm text-gray-500">Total capacity filled</p>
          </div>
        </div>
      </div>
    </div>
  );
}
