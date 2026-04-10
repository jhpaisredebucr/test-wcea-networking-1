"use client"

import { useEffect } from "react";
import { useRouter } from "next/navigation"

export default function Page(){
    const router = useRouter();

    useEffect(() => {
    const isLoggedIn = false;
    if (!isLoggedIn) {
      router.push("/home")
    }
    // router.push("/dashboard/admin")
  });


    return (
        <>

        </>
    )
}