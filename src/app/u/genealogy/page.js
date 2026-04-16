'use client';

import { useEffect, useState } from "react";
import ReferralTree from "@/app/components/ReferralTree";


export default function Page() {
  const [userData, setUserData] = useState(null);
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [rootTree, setRootTree] = useState(null);

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
        setDashboardData(dashRes.dashboardData);

        // Root: current user (empty children for lazy load)
        const root = {
          id: userRes.userInfo.referral_code,
          name: `${userRes.profile?.first_name || ''} ${userRes.profile?.last_name || ''} (${userRes.userInfo.username}) [${userRes.userInfo.status}]`,
          children: []  // Load children on click
        };
        setRootTree(root);

        // Pre-load direct referrals for demo
        const directChildren = (dashRes.dashboardData?.referredMembers || []).map(member => ({
          id: member.referral_code,
          name: `${member.first_name || ''} ${member.last_name || ''} (${member.username}) [${member.status}]`,
          children: []  // Lazy
        }));
        // Temporarily add to root for static test
        setRootTree({...root, children: directChildren });

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
      <div className="w-full flex">
        <div className="w-full px-20 py-7 bg-gray-100 min-h-screen flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
            <div className="text-xl text-gray-700">Loading Genealogy...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-20 py-7 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-8">Genealogy Tree</h1>
      <p className="mb-4 text-gray-600">
        Referral Code: <span className="font-mono bg-blue-100 px-2 py-1 rounded">{userData?.userInfo?.referral_code}</span>
      </p>
      {rootTree ? (
        <div style={{ width: "100%", height: "70vh" }}>
          <ReferralTree 
            data={rootTree} 
            fetchChildren={async (refCode) => {
              const res = await fetchJson(`/api/portal/member?userReferralCode=${refCode}`);
              return res.dashboardData.referredMembers || [];
            }} 
          />
        </div>
      ) : (

        <div className="text-center py-20 text-gray-500">No referrals yet. Invite members using your code!</div>
      )}
    </div>
  );
}

//     name: "Juan Dela Cruz",
//     children: [
//       {
//         name: "Maria Dela Cruz",
//         children: [
//           { name: "Ana Santos" },
//           { name: "Pedro Santos" }
//         ]
//       },
//       {
//         name: "Jose Dela Cruz",
//         children: [{ name: "Luis Cruz" }]
//       }
//     ]
//   };
