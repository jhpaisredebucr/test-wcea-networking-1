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
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-dashed"></div>
          <div className="text-xl text-gray-700">Loading...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="flex max-w-md flex-col items-center gap-4 text-center text-xl text-red-500">
          <p>{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 rounded bg-primary px-4 py-2 text-white hover:bg-secondary"
          >
            Retry
          </button>
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
