"use client";

import { useEffect, useState } from "react";
import MembersAdmin from "../../../components/admin/Members";

export default function Page() {

  const [userData, setUserData] = useState(null);
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refreshDashboard = async () => {
    try {
      setLoading(true);
      // USER DATA
      const resUser = await fetch("/api/users");
      const userRes = await resUser.json();
      setUserData(userRes.success ? userRes : null);

      // DASHBOARD DATA
      const resDash = await fetch("/api/portal/admin/analytics");
      const dashRes = await resDash.json();
      setDashboardData(dashRes.dashboardData);
    } catch (err) {
      console.error(err);
      setError("Failed to refresh data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshDashboard();
  }, []);

  if (loading) {
    return (
      <div className="w-full flex">
        <div className="w-full ml-56 px-20 py-7 bg-gray-100 min-h-screen flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
            <div className="text-xl text-gray-700">Loading...</div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full flex">
        <div className="w-full ml-56 px-20 py-7 bg-gray-100 min-h-screen flex items-center justify-center">
          <div className="text-red-500 text-xl max-w-md text-center flex flex-col items-center gap-4">
            <p>{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <MembersAdmin
      userData={userData}
      dashboardData={dashboardData}
      onRefresh={refreshDashboard}
    />
  );
}
