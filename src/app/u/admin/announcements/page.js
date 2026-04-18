import AnnouncementAdmin from "@/app/components/admin/Announcement";

import { getUserFromToken } from "@/lib/users";
import { getAnnouncements } from "@/lib/announcement";
import { cookies } from "next/headers";

export const revalidate = 60;

export default async function AdminPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  // USER
  const userData = await getUserFromToken(token);

  // DASHBOARD
  const announcements = await getAnnouncements();

  return (
    <AnnouncementAdmin
      announcements={announcements}
      userData={userData}
    />
  );
}