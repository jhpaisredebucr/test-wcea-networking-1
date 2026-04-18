import { query } from "@/lib/db";
import ProductShop from "@/app/components/member/ProductShop";

import { getProducts } from "@/lib/products";
import { getUserFromToken } from "@/lib/users";
import { getMemberDashboardData } from "@/lib/dashboard";
import { getCurrentUserToken } from "@/lib/token";

export default async function Page() {
  const user = await getCurrentUserToken();

  if (!user) {
    return <div>Unauthorized</div>;
  }

  const userId = user.id;
  const referral_code = user.referral_code;

  const dashboardData = await getMemberDashboardData({userReferralCode: referral_code});
  const userData = await getUserFromToken(userId);
  const products = await getProducts();

  return (
    <ProductShop
      products={products.products}
      userData={userData}
      dashboardData={dashboardData}
    />
  );
}