"use client";

import { useEffect, useState } from "react";
import DashboardAdmin from "@/app/components/ui/admin/Dashboard";

export default function AdminPage() {

  const [dashboardData, setDashboardData] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {

    // USER INFO
    fetch("/api/users")
      .then(res => res.json())
      .then(data => {
        setUserData(data.success ? data : null);
      })
      .catch(err => console.error("User fetch error:", err));


    // DASHBOARD DATA
    fetch("/api/portal/admin/analytics")
      .then(res => res.json())
      .then(data => {
        setDashboardData(data.dashboardData);
      })
      .catch(err => console.error("Dashboard fetch error:", err));

  }, []);

  return (
    <DashboardAdmin
      dashboardData={dashboardData}
      userData={userData}
    />
  );
}