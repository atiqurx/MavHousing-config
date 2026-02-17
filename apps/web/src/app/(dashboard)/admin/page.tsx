
'use client';

import { useAuth } from '../../../context/AuthContext';

export default function AdminDashboard() {
  const { user } = useAuth();

  return (
    <div className="grid gap-4 md:grid-cols-4">
          {/* User Mgmt */}
          <div className="bg-muted/50 aspect-video rounded-xl p-6 flex flex-col justify-between border-t-4 border-purple-600">
            <div>
                <h2 className="text-lg font-semibold mb-2">User Management</h2>
                <p className="text-sm text-muted-foreground mb-4">Create/Delete Staff & Admins</p>
            </div>
            <button className="text-purple-600 hover:text-purple-800 font-medium text-sm text-left">Manage Users &rarr;</button>
          </div>

          {/* Role Mgmt */}
          <div className="bg-muted/50 aspect-video rounded-xl p-6 flex flex-col justify-between border-t-4 border-indigo-600">
            <div>
                <h2 className="text-lg font-semibold mb-2">Role Permissions</h2>
                <p className="text-sm text-muted-foreground mb-4">Modify access levels</p>
            </div>
            <button className="text-indigo-600 hover:text-indigo-800 font-medium text-sm text-left">Configure Roles &rarr;</button>
          </div>

          {/* System Logs */}
          <div className="bg-muted/50 aspect-video rounded-xl p-6 flex flex-col justify-between border-t-4 border-gray-600">
             <div>
                <h2 className="text-lg font-semibold mb-2">System Logs</h2>
                <p className="text-sm text-muted-foreground mb-4">View audit trails</p>
             </div>
             <button className="text-gray-600 hover:text-gray-800 font-medium text-sm text-left">View Logs &rarr;</button>
          </div>

          {/* Auto Assignment */}
           <div className="bg-muted/50 aspect-video rounded-xl p-6 flex flex-col justify-between border-t-4 border-orange-600">
             <div>
                <h2 className="text-lg font-semibold mb-2">Auto-Assignment</h2>
                <p className="text-sm text-muted-foreground mb-4">Run matching algorithms</p>
             </div>
             <button className="text-orange-600 hover:text-orange-800 font-medium text-sm text-left">Run Job &rarr;</button>
          </div>
    </div>
  );
}
