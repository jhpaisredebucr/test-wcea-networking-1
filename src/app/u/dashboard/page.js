'use client';

import { useEffect, useState } from "react";
import DashboardMember from "@/app/u/components/member/Dashboard";
import Transactions from "../components/member/Transactions";

export default function Page() {
  const [dashboardData, setDashboardData] = useState(null);
  const [userData, setUserData] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchJson = async (url) => {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
  };

  // DASHBOARD DATAA
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const userRes = await fetchJson("/api/users");

        if (!userRes.success) {
          throw new Error("Failed to load user");
        }

        setUserData(userRes);

        const dashRes = await fetchJson(
          `/api/portal/member?userReferralCode=${userRes.userInfo.referral_code}`
        );

        setDashboardData(dashRes.dashboardData);
        console.log(dashRes);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []); 

  // TRANSACTIONS - Fetch transaction data
  useEffect(() => {
    const loadTransactions = async () => {
      try {
        const res = await fetch("/api/transaction");
        const data = await res.json();
        setTransactions(data.transactions || []);
      } catch (err) {
        console.error("Failed to load transactions:", err);
      }
    };

    loadTransactions();
  }, []);

  // LOADING UI
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

  // ERROR UI
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

  // MAIN
  return (
    <>
      <h1 className="text-3xl font-semibold mb-6">Dashboard</h1>
      <DashboardMember dashboardData={dashboardData} userData={userData} />
      <h2 className="text-2xl text-center font-semibold my-6 p-6 rounded-lg shadow bg-white">Latest Transaction</h2>
      <Transactions transactions={transactions}/>
    </>
  );
}