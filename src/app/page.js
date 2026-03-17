"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";


export default function Home() {

  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = true;
    if (!isLoggedIn) {
      router.push("/auth/signin")
    }
    // router.push("/dashboard/admin")
  });

  return (
    <div>
      <p>PRODUCTS</p>
    </div>
  );
}
