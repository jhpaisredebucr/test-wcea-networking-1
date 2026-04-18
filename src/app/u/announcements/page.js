import AnnouncementMember from "@/app/components/member/Announcement";
import { getAnnouncements } from "@/lib/announcement";

export const revalidate = 60;

async function timedGetAnnouncements() {
  const start = performance.now();

  const data = await getAnnouncements();

  console.log("DB + query time:", performance.now() - start, "ms");

  return data;
}

export default async function Page() {
  const announcements = await timedGetAnnouncements();

  return (
    <AnnouncementMember announcements={announcements} />
  );
}