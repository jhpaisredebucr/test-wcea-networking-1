'use client';

import { useEffect, useState } from "react";
import AnnouncementMember from "@/app/components/ui/member/Announcement";

export default function Page() {
  const [announcements, setData] = useState([]);

  useEffect(() => {
    fetch("/api/announcement")
      .then(res => res.json())
      .then(d => setData(d.announcements));
  }, []);

  return (
    <div className="py-7">
      <h1 className="text-3xl font-semibold mb-6">Announcement</h1>
      <AnnouncementMember announcements={announcements} />
    </div>
  );
}