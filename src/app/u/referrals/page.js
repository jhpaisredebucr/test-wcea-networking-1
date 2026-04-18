//SERVER COMPONENT

import ReferralsContainer from "@/app/components/member/ReferralsContainer";
import { getCurrentUserToken } from "@/lib/token";
import { getUserFromToken } from "@/lib/users";
import { getMemberDashboardData } from "@/lib/dashboard";

export default async function Page() {
  const user = await getCurrentUserToken();

  if (!user) {
    return <div>Unauthorized</div>;
  }

  const userId = user.id;
  const referral_code = user.referral_code;

  const userData = await getUserFromToken(userId);
  const dashboardData = await getMemberDashboardData({userReferralCode: referral_code});
  
  return (
    <>
      <ReferralsContainer
        userData={userData}
        dashboardData={dashboardData.dashboardData}
      />
    </>
  )
}