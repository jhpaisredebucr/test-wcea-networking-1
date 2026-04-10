'use client';

import { useEffect, useState } from "react";
import AnnouncementMember from "@/app/u/components/member/Announcement";

export default function Page() {
  const [announcements, setData] = useState([]);

  useEffect(() => {
    fetch("/api/announcement")
      .then(res => res.json())
      .then(d => setData(d.announcements));
  }, []);

  return (
    <>
      <h1 className="text-3xl font-semibold mb-6">Announcement</h1>
      <AnnouncementMember announcements={announcements} />
    </>
  );
}