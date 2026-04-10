'use client';

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import TopBar from "@/app/u/components/layout/TopBar";
import SideBar from "@/app/u/components/layout/SideBar";
import UploadImageModal from "@/app/components/ui/UploadPicture";

export default function DashboardLayout({ children }) {
  const [user, setUser] = useState({
    userInfo: null,
    profile: null,
    contacts: null,
    address: null
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  // fetch user only (shared)
  useEffect(() => {
    const loadUser = async () => {
      try {
        const res = await fetch("/api/users", { credentials: "include" });
        const data = await res.json();

        if (data.success) {
          setUser({
            userInfo: data.userInfo,
            profile: data.profile,
            contacts: data.contacts,
            address: data.address
          });
        } else {
          setError("Failed to load user");
        }
      } catch {
        setError("Failed to load user");
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  if (loading) return <div className="p-10">Loading...</div>;
  if (error) return <div className="p-10 text-red-500">{error}</div>;

  return (
    <>
      <UploadImageModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onUpload={(url) => console.log(url)}
      />

      <TopBar userData={user} />
      <SideBar role={user.userInfo.role}/>

      <div className="w-full flex">
        <div className="w-full ml-56 px-15 py-7 bg-gray-100 min-h-screen">
          {children}
        </div>
      </div>
    </>
  );
}