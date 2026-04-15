"use client";

import { useEffect, useState } from "react";
import MembersAdmin from "../../../components/ui/admin/Members";

export default function Page() {

  const [userData, setUserData] = useState(null);
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {

    // USER DATA
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
    <MembersAdmin
      userData={userData}
      dashboardData={dashboardData}
    />
  );
}