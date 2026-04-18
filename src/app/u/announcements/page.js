import AnnouncementMemberContainer from "@/app/components/member/AnnouncementMemberContainer";

import { getUserFromToken } from "@/lib/users";
import { getAnnouncements } from "@/lib/announcement";
import { cookies } from "next/headers";

export const revalidate = 60;

export default async function Page() {
  // DASHBOARD
  const announcements = await getAnnouncements();

  return (
    <AnnouncementMemberContainer
      announcements={announcements}
    />
  );
}