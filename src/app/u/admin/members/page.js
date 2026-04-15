import MembersAdmin from "../../../components/ui/admin/Members";
import { headers } from "next/headers";

export default async function Page() {

  const headersList = headers();
  const host = headersList.get("host");
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
  const baseUrl = `${protocol}://${host}`;

  // USER INFO
  const userDataRes = await fetch(`${baseUrl}/api/users`, {
    cache: "no-store"
  });

  const userDataJson = await userDataRes.json();
  const userData = userDataJson.success ? userDataJson : null;


  // DASHBOARD DATA
  const dashboardRes = await fetch(`${baseUrl}/api/portal/admin/analytics`, {
    cache: "no-store"
  });

  const dashboardJson = await dashboardRes.json();
  const dashboardData = dashboardJson.dashboardData;


  return (
    <MembersAdmin
      userData={userData}
      dashboardData={dashboardData}
    />
  );

}