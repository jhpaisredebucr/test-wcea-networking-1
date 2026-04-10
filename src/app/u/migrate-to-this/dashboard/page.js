'use client';


import { useEffect, useState } from "react";
import DashboardMember from "@/app/u/components/member/Dashboard";

export default function Page() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/api/portal/member")
      .then(res => res.json())
      .then(d => setData(d.dashboardData));
  }, []);

  return (
    <>
      <h1 className="text-3xl font-semibold mb-6">Dashboard</h1>
      <DashboardMember dashboardData={data} />
    </>
  );
}