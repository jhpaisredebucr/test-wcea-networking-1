"use client";

import { useEffect, useState } from "react";
import MembersAdmin from "../../../components/ui/admin/Members";

export default function Page() {

  const [userData, setUserData] = useState(null);
  const [dashboardData, setDashboardData] = useState(null);

  const refreshDashboard = async () => {
    try {
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
    }
  };

  useEffect(() => {
    refreshDashboard();
  }, []);

  return (
    <MembersAdmin
      userData={userData}
      dashboardData={dashboardData}
      onRefresh={refreshDashboard}
    />
  );
}