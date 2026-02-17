
'use client';

import { useAuth } from '../../../context/AuthContext';

export default function AdminDashboard() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Console</h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-600">Active Admin: {user?.username || 'Admin'}</span>
            <button 
              onClick={logout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-colors"
            >
              Logout
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* User Mgmt */}
          <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-purple-600">
            <h2 className="text-lg font-semibold mb-2">User Management</h2>
            <p className="text-sm text-gray-500 mb-4">Create/Delete Staff & Admins</p>
            <button className="text-purple-600 hover:text-purple-800 font-medium text-sm">Manage Users &rarr;</button>
          </div>

          {/* Role Mgmt */}
          <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-indigo-600">
            <h2 className="text-lg font-semibold mb-2">Role Permissions</h2>
            <p className="text-sm text-gray-500 mb-4">Modify access levels</p>
            <button className="text-indigo-600 hover:text-indigo-800 font-medium text-sm">Configure Roles &rarr;</button>
          </div>

          {/* System Logs */}
          <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-gray-600">
             <h2 className="text-lg font-semibold mb-2">System Logs</h2>
             <p className="text-sm text-gray-500 mb-4">View audit trails</p>
             <button className="text-gray-600 hover:text-gray-800 font-medium text-sm">View Logs &rarr;</button>
          </div>

          {/* Auto Assignment */}
           <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-orange-600">
             <h2 className="text-lg font-semibold mb-2">Auto-Assignment</h2>
             <p className="text-sm text-gray-500 mb-4">Run matching algorithms</p>
             <button className="text-orange-600 hover:text-orange-800 font-medium text-sm">Run Job &rarr;</button>
          </div>
        </div>
      </div>
    </div>
  );
}
