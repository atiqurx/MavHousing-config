'use client';

import { useAuth } from '../../../context/AuthContext';

export default function StaffDashboard() {
  const { user } = useAuth();

  return (
    <div className="grid gap-4 md:grid-cols-3">
          {/* Applications */}
          <div className="bg-muted/50 aspect-video rounded-xl p-6 flex flex-col justify-center border-l-4 border-blue-500">
            <h2 className="text-xl font-semibold mb-2">Pending Applications</h2>
            <p className="text-3xl font-bold text-foreground">0</p>
            <p className="text-sm text-muted-foreground">Requires review</p>
          </div>

          {/* Maintenance */}
          <div className="bg-muted/50 aspect-video rounded-xl p-6 flex flex-col justify-center border-l-4 border-yellow-500">
            <h2 className="text-xl font-semibold mb-2">Open Maintenance Tickets</h2>
            <p className="text-3xl font-bold text-foreground">0</p>
            <p className="text-sm text-muted-foreground">Assigned to you</p>
          </div>
          
           {/* Occupancy */}
           <div className="bg-muted/50 aspect-video rounded-xl p-6 flex flex-col justify-center border-l-4 border-green-500">
            <h2 className="text-xl font-semibold mb-2">Unit Occupancy</h2>
            <p className="text-3xl font-bold text-foreground">0%</p>
            <p className="text-sm text-muted-foreground">Total capacity filled</p>
          </div>
    </div>
  );
}
