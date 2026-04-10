"use client";

import Profile from "@/app/components/ui/Profile";
import ProfileCard from "@/app/components/ui/ProfileCard";
import UploadImageModal from "@/app/components/ui/UploadPicture";
import { useState, useEffect } from "react";

export default function ProfilePage() {

  const [formData, setFormData] = useState(null);

  const inputStyle =
    "w-full bg-transparent border-none outline-none focus:outline-none focus:ring-0";

  const fetchJson = async (url) => {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetchJson("/api/users");

        if (!res.success) throw new Error("Failed to load user");

        setFormData(res);

      } catch (err) {
        console.error(err);
      }
    };

    loadData();
  }, []);

  const handleChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

    const handleSave = async () => {
        console.log("Saving:", formData);
        
        try {
            const res = await fetch("/api/users/update", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
            });

            const data = await res.json();

            if (!data.success) {
            alert("Update failed");
            return;
            }

            alert("Profile updated successfully");

        } catch (err) {
            console.error(err);
            alert("Something went wrong");
        }
    };

    const [isUploadOpen, setIsUploadOpen] = useState(false);
    const [profilePic, setProfilePic] = useState(null);

    function handleUpload(imgUrl) {
    setFormData(prev => ({
        ...prev,
        profile: {
            ...prev.profile,
            img_url: imgUrl
        }
    }));
}

  const { profile, contacts, address, userInfo, referredBy } = formData || {};

  return (
    <div className="flex flex-col max-w-3xl mx-auto mt-20 p-6 bg-white rounded-xl shadow-md items-center">
        <UploadImageModal
            isOpen={isUploadOpen}
            onClose={() => setIsUploadOpen(false)}
            onUpload={(handleUpload)}
        />
        <Profile GoProfile={setIsUploadOpen} profile={profilePic} width={100} height={100}  />

        {/* NAME */}
        <p className="text-lg font-semibold mt-2">
            {profile?.first_name} {profile?.middle_name} {profile?.last_name}
        </p>

        {/* PERSONAL INFO */}
        <div className="grid grid-cols-3 gap-2 mt-6 w-full">
            <ProfileCard label="First Name">
            <input
                className={inputStyle}
                value={profile?.first_name || ""}
                onChange={e => handleChange("profile", "first_name", e.target.value)}
            />
            </ProfileCard>

            <ProfileCard label="Middle Name">
            <input
                className={inputStyle}
                value={profile?.middle_name || ""}
                onChange={e => handleChange("profile", "middle_name", e.target.value)}
            />
            </ProfileCard>

            <ProfileCard label="Last Name">
            <input
                className={inputStyle}
                value={profile?.last_name || ""}
                onChange={e => handleChange("profile", "last_name", e.target.value)}
            />
            </ProfileCard>
        </div>

        {/* ACCOUNT INFO */}
        <div className="grid grid-cols-2 gap-2 mt-4 w-full">
            <ProfileCard label="Username">
            <input
                className={inputStyle}
                value={userInfo?.username || ""}
                onChange={e => handleChange("userInfo", "username", e.target.value)}
            />
            </ProfileCard>

            <ProfileCard label="Referral Code">
            <input
                className={inputStyle}
                value={userInfo?.referral_code || ""}
                disabled
            />
            </ProfileCard>
        </div>

        <div className="grid grid-cols-2 gap-2 mt-2 w-full">
            <ProfileCard label="Referred By">
            <input
                className={inputStyle}
                value={referredBy?.username || ""}
                disabled
            />
            </ProfileCard>

            <ProfileCard label="Plan">
            <input
                className={inputStyle}
                value={userInfo?.plan || ""}
                disabled
            />
            </ProfileCard>
        </div>

        {/* CONTACT INFO */}
        <div className="grid grid-cols-2 gap-2 mt-4 w-full">
            <ProfileCard label="Email">
            <input
                className={inputStyle}
                value={contacts?.email || ""}
                onChange={e => handleChange("contacts", "email", e.target.value)}
            />
            </ProfileCard>

            <ProfileCard label="Contact No">
            <input
                className={inputStyle}
                value={contacts?.contact_no || ""}
                onChange={e => handleChange("contacts", "contact_no", e.target.value)}
            />
            </ProfileCard>
        </div>

        {/* ADDRESS INFO */}
        <div className="grid grid-cols-2 gap-2 mt-4 w-full">
            <ProfileCard label="City">
            <input
                className={inputStyle}
                value={address?.city || ""}
                onChange={e => handleChange("address", "city", e.target.value)}
            />
            </ProfileCard>

            <ProfileCard label="Barangay">
            <input
                className={inputStyle}
                value={address?.barangay || ""}
                onChange={e => handleChange("address", "barangay", e.target.value)}
            />
            </ProfileCard>
        </div>

        <div className="grid grid-cols-2 gap-2 mt-2 w-full">
            <ProfileCard label="Postal Code">
            <input
                className={inputStyle}
                value={address?.postal_code || ""}
                onChange={e => handleChange("address", "postal_code", e.target.value)}
            />
            </ProfileCard>

            <ProfileCard label="Street Address">
            <input
                className={inputStyle}
                value={address?.street_address || ""}
                onChange={e => handleChange("address", "street_address", e.target.value)}
            />
            </ProfileCard>
        </div>

        {/* DOB */}
        <div className="grid grid-cols-1 gap-2 mt-4 w-full">
            <ProfileCard label="Date of Birth">
            <input
                type="date"
                className={inputStyle}
                value={profile?.dob || ""}
                onChange={e => handleChange("profile", "dob", e.target.value)}
            />
            </ProfileCard>
        </div>

        {/* STATUS + ROLE */}
        <div className="grid grid-cols-2 gap-2 mt-4 w-full">
            <ProfileCard label="Status">
            <input
                className={inputStyle}
                value={userInfo?.status || ""}
                disabled
            />
            </ProfileCard>

            <ProfileCard label="Role">
            <input
                className={inputStyle}
                value={userInfo?.role || ""}
                disabled
            />
            </ProfileCard>
        </div>

        {/* SAVE BUTTON */}
        <button
            onClick={handleSave}
            className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
            Save Changes
        </button>

        </div>
    );
}