'use client';

import { useEffect, useState } from "react";
import ReferralsMember from "@/app/components/ui/member/Referrals";
import MemberReferredMembers from "@/app/components/ui/MemberReferredMembers";
import Card from "@/app/components/ui/card/Card";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Page() {

  const [dashboardData, setDashboardData] = useState(null);
  const [userData, setUserData] = useState(null);
  const [selectedDashboardData, setSelectedDashboardData] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState('');
  
  const referrals = dashboardData?.referredMembers.filter(user => user.username.toLowerCase().includes(searchTerm.toLowerCase())) || [];

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
      <div className="bg-white p-2 rounded-xl">
        <div className="flex gap-4 p-2 justify-between items-center border-2 border-gray-200 border-dotted rounded-xl">
          <div className="flex gap-2">
            <p>Your Referral Code: </p>
            <p className="font-bold">{userData?.userInfo?.referral_code}</p>
          </div>

          <button
            onClick={() => router.push("/u/referrals/genealogy")}
            className="p-2 bg-(--primary) text-white rounded-lg"
          >
            Open Member Tree
          </button>
        </div>
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
      <div className="my-6 p-3 rounded-lg shadow bg-white flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Image src="/icons/referrals.svg" alt="icon" width={20} height={20}/>
          <h2 className="text-lg font-semibold">Referrals</h2>
        </div>
        
        <div className="flex gap-5">
          <input
              type="text"
              placeholder="Search by username..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <button 
              onClick={() => setSearchTerm('')}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
          >
              Clear
          </button>
        </div>
      </div>
      <ReferralsMember
        userData={userData}
        referrals={referrals}
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