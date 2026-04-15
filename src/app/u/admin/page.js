"use client";

import { useEffect, useState } from "react";
import DashboardAdmin from "@/app/components/ui/admin/Dashboard";

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
    <DashboardAdmin
      dashboardData={dashboardData}
      userData={userData}
    />
  );
}