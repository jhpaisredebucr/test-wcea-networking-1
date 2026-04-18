//SERVER COMPONENT

import AnnouncementMember from "@/app/components/member/Announcement";
import { getAnnouncements } from "@/lib/announcement";

export const revalidate = 60;

export default async function Page() {
  // DASHBOARD
  const announcements = await getAnnouncements();

  return (
    <AnnouncementMember
      announcements={announcements}
    />
  );
}