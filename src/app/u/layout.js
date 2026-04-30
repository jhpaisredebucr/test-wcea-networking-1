'use client';

import { useEffect, useState } from "react";
import TopBar from "@/app/components/layout/DashboardTopBar";
import SideBar from "@/app/components/layout/DashboardSideBar";
import UploadImageModal from "@/app/components/modal/UploadPicture";
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <UploadImageModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onUpload={(url) => console.log(url)}
      />

      <TopBar
        userData={user}
        isMobileMenuOpen={isMobileMenuOpen}
        onMenuToggle={() => setIsMobileMenuOpen((prev) => !prev)}
      />

      <div className="relative flex-1 md:flex md:min-h-0">
        <SideBar
          role={user.userInfo.role}
          isMobileMenuOpen={isMobileMenuOpen}
          onCloseMobileMenu={() => setIsMobileMenuOpen(false)}
        />

        <main
          className={`w-full flex-1 px-4 py-5 sm:px-6 md:px-8 lg:px-10 ${
            user.userInfo?.role === "admin" ? "py-4" : "py-6"
          }`}
        >
          <div className="mx-auto w-full max-w-[1400px]">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}