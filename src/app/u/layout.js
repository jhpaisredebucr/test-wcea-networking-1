'use client';

import { useEffect, useState } from "react";
import TopBar from "@/app/components/layout/DashboardTopBar";
import SideBar from "@/app/components/layout/DashboardSideBar";
import UploadImageModal from "@/app/components/ui/UploadPicture";
import Loading from "../components/ui/Loading";
import ErrorText from "../components/ui/ErrorText";

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


  // LOADING UI
  if (loading) {
    return (
      <Loading></Loading>
    );
  }

  if (error) return <ErrorText label={error} fullScreen />;

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
      <div className={`w-full ml-56 px-15 \${user.userInfo?.role === 'admin' ? 'py-[15px]' : ''} bg-gray-100 min-h-[calc(100vh-64px)]`}>
        {children}
      </div>
      </div>
    </>
  );
}