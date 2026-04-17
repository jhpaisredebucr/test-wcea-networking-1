'use client';

import { useEffect, useState } from "react";
import ReferralsMember from "@/app/components/ui/member/Referrals";
import MemberReferredMembers from "@/app/components/ui/MemberReferredMembers";
import Card from "@/app/components/ui/card/Card";
import { useRouter } from "next/navigation";

export default function Page() {

  const [dashboardData, setDashboardData] = useState(null);
  const [userData, setUserData] = useState(null);
  const [selectedDashboardData, setSelectedDashboardData] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  const fetchJson = async (url) => {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        // -----------------------
        // USER
        // -----------------------
        const userRes = await fetchJson("/api/users");

        if (!userRes.success) {
          throw new Error("Failed to load user");
        }

        const referralCode = userRes?.userInfo?.referral_code;

        // -----------------------
        // DASHBOARD
        // -----------------------
        const dashRes = await fetchJson(
          `/api/portal/member?userReferralCode=${referralCode}`
        );

        const dashboard = dashRes?.dashboardData || {};

        // -----------------------
        // SET STATE
        // -----------------------
        setUserData(userRes);
        setDashboardData(dashboard);

        // -----------------------
        // DEBUG (REAL VALUES ONLY)
        // -----------------------
        console.log("USER API:", userRes);
        console.log("REFERRAL CODE:", referralCode);
        console.log("DASHBOARD API:", dashRes);
        console.log("DASHBOARD DATA:", dashboard);

      } catch (err) {
        console.error("Dashboard load error:", err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // -----------------------
  // LOADING UI
  // -----------------------
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

  // -----------------------
  // MAIN UI
  // -----------------------
  return (
    <>
      {/* HEADER */}
      <div className="flex justify-between items-center py-7">
        <p>
          Your Referral Code: {userData?.userInfo?.referral_code}
        </p>

        <button
          onClick={() => router.push("/u/referrals/genealogy")}
          className="p-2 bg-(--primary) text-white rounded-lg"
        >
          Open Member Tree
        </button>
      </div>

      {/* CARDS */}
      <div className="grid grid-cols-2 gap-5 my-5">
        <Card
          title="Total Referred"
          value={dashboardData?.totalReferredMembers}
          info=""
        />
        <Card
          title="Pending"
          value={dashboardData?.pendingCount}
          info=""
        />
      </div>

      {/* REFERRALS */}
      <h1 className="text-3xl font-semibold mb-6">Referrals</h1>

      <ReferralsMember
        userData={userData}
        dashboardData={dashboardData}
        setSelectedDashboardData={setSelectedDashboardData}
        setIsOpen={setIsOpen}
        isOpen={isOpen}
      />

      {isOpen && (
        <MemberReferredMembers
          dashboardData={selectedDashboardData}
          setIsOpen={setIsOpen}
          isOpen={isOpen}
        />
      )}
    </>
  );
}