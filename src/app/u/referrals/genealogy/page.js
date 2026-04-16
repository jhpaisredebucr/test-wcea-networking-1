'use client';

import { useEffect, useState } from "react";
import ReferralTree from "@/app/components/ReferralTree";
import { useRouter } from "next/navigation";

export default function Page() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [rootTree, setRootTree] = useState(null);
  const router = useRouter();

  const fetchJson = async (url) => {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const userRes = await fetchJson("/api/users");
        if (!userRes.success) throw new Error("Failed to load user");

        setUserData(userRes);

        const dashRes = await fetchJson(
          `/api/portal/member?userReferralCode=${userRes.userInfo.referral_code}`
        );

        const root = {
          id: userRes.userInfo.referral_code,
          name: `${userRes.profile?.first_name || ''} ${userRes.profile?.last_name || ''} (${userRes.userInfo.username}) [${userRes.userInfo.status}]`,
          children: []
        };

        const directChildren = (dashRes.dashboardData?.referredMembers || []).map(member => ({
          id: member.referral_code,
          name: `${member.first_name || ''} ${member.last_name || ''} (${member.username}) [${member.status}]`,
          children: []
        }));

        setRootTree({ ...root, children: directChildren });

      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="w-full h-[calc(100vh-64px)] flex items-center justify-center bg-gray-100">
        <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="w-full h-[calc(100vh-64px)] bg-gray-100 relative overflow-hidden">

      {/* TREE AREA */}
      <div className="w-full h-[calc(100vh-64px)] overflow-hidden">

        {rootTree ? (
          <ReferralTree
            data={rootTree}
            fetchChildren={async (refCode) => {
              const res = await fetchJson(
                `/api/portal/member?userReferralCode=${refCode}`
              );
              return res.dashboardData.referredMembers || [];
            }}
          />
        ) : (
          <div className="h-full flex items-center justify-center text-gray-500">
            No referrals yet
          </div>
        )}

      </div>

      {/* FLOATING HEADER */}
      <div className="absolute top-4 left-4 right-4 z-50 flex flex-col md:flex-row md:justify-between md:items-center gap-3 pointer-events-none">

        <div className="bg-white/90 backdrop-blur-md px-4 py-3 rounded-lg shadow border pointer-events-auto">
          <h1 className="text-lg font-bold">Genealogy Tree</h1>

          <p className="text-sm text-gray-600 mt-1">
            Referral Code:{" "}
            <span className="font-mono bg-blue-100 px-2 py-1 rounded">
              {userData?.userInfo?.referral_code}
            </span>
          </p>
        </div>

        <button
          onClick={() => router.push("/u/referrals")}
          className="bg-[var(--primary)] text-white px-4 py-2 rounded-lg shadow hover:opacity-90 pointer-events-auto"
        >
          View Member Table
        </button>

      </div>

    </div>
  );
}