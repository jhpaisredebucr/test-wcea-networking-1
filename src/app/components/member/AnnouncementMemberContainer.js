'use client';

import { useEffect, useState } from "react";
import AnnouncementMember from "@/app/components/member/Announcement";
import Title from "@/app/components/ui/Title";

export default function AnnouncementMemberContainer({ announcements }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState('');
  
  const filterAnnouncements = announcements.filter(user =>
    user.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.short_description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.long_description?.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

      } catch (err) {
        console.error(err);
        setError('Failed to load announcements');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="w-full flex">
        <div className="w-full ml-56 px-20 py-7 bg-gray-100 min-h-screen flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
            <div className="text-xl text-gray-700">Loading...</div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full flex">
        <div className="w-full ml-56 px-20 py-7 bg-gray-100 min-h-screen flex items-center justify-center">
          <div className="text-red-500 text-xl max-w-md text-center flex flex-col items-center gap-4">
            <p>{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 p-3 rounded-lg shadow bg-white flex justify-between items-center">
        <Title
          title="Announcement"
          icon="/icons/announcement.svg"
        />
        
        <div className="flex gap-5">
          <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <button 
              onClick={() => setSearchTerm('')}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
          >
              Clear
          </button>
        </div>
      </div>
      <AnnouncementMember announcements={filterAnnouncements} />
    </div>
  );
}
