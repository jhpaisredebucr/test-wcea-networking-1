"use client";

import { useEffect, useState } from "react";
import AdminDashboard from "../../components/ui/admin/AdminPage";

export default function AdminPage() {

  const [dashboardData, setDashboardData] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {

    // DASHBOARD DATA
    fetch("/api/portal/admin/analytics")
      .then(res => res.json())
      .then(data => setDashboardData(data.dashboardData));

    // USER DATA
    fetch("/api/users")
      .then(res => res.json())
      .then(data => setUserData(data.success ? data : null));

  }, []);

  return (
    <AdminDashboard
      dashboardData={dashboardData}
      userData={userData}
    />
  );
}