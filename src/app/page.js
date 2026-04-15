// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";


// export default function Home() {
//   const router = useRouter();
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const checkAuth = async () => {
//       try {
//         const res = await fetch('/api/auth/logged-in');
//         const data = await res.json();
//         const isLoggedIn = data.loggedIn;
//         if (isLoggedIn) {
//           router.push("/u/dashboard");
//         } else {
//           router.push("/home");
//         }
//       } catch (error) {
//         router.push("/home");
//       } finally {
//         setLoading(false);
//       }
//     };

//     checkAuth();
//   }, [router]);

//   if (loading) {
//     return (
//       <div>
//         <p>Loading WCEA Networking Website...</p>
//       </div>
//     );
//   }

//   return null;
// }

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";


export default function Home() {

  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = false;
    if (!isLoggedIn? router.push("/home") : router.push("/dashboard/admin"));  
     
    // router.push("/dashboard/admin")
  });

  return (
    <div>
      <p>Loading WCEA Networking Website...</p>
    </div>
  );
}
