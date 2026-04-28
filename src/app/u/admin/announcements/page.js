import AnnouncementAdmin from "@/app/components/admin/Announcement";

import { getUserFromToken } from "@/lib/users";
import { getUserIdFromToken } from "@/lib/token";
import { redirect } from "next/navigation";
import { getAnnouncements } from "@/lib/announcement";
import { cookies } from "next/headers";

export const revalidate = 60;

export default async function AdminPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const userId = getUserIdFromToken(token);
  if (!userId) {
    redirect("/login");
  }

  // USER
  const userData = await getUserFromToken(userId);

  // DASHBOARD
  const announcements = await getAnnouncements();

  return (
    <AnnouncementAdmin
      announcements={announcements}
      userData={userData}
    />
  );
}