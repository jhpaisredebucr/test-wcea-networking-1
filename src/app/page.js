"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";


export default function Home() {

  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = false;
    if (!isLoggedIn? router.push("/home/main") : router.push("/dashboard/admin"));  
     
    // router.push("/dashboard/admin")
  });

  return (
    <div>
      <p>Loading WCEA Networking Website...</p>
    </div>
  );
}
