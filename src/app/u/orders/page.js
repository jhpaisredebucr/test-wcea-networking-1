'use client';

import { useEffect, useState } from "react";
import OrdersMember from "@/app/u/components/member/MyOrders";

export default function Page() {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchJson = async (url) => {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const userRes = await fetchJson("/api/users");

        if (!userRes.success) {
          throw new Error("Failed to load user");
        }

        setUserData(userRes);

        fetch("/api/products")
          .then(res => res.json())
          .then(d => setProducts(d.products));

        fetch("/api/products/orders")
          .then(res => res.json())
          .then(d => setOrders(d.orders));

        fetch("/api/products")
          .then(res => res.json())
          .then(d => setProducts(d.products));

      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // if (loading) {
  //   return (
  //     <div className="w-full flex">
  //       <div className="w-full ml-56 px-20 py-7 bg-gray-100 min-h-screen flex items-center justify-center">
  //         <div className="flex flex-col items-center gap-4">
  //           <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
  //           <div className="text-xl text-gray-700">Loading...</div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <>
      <h1 className="text-3xl font-semibold mb-6">My Orders</h1>
      <OrdersMember orders={orders} products={products} userData={userData} />
    </>
  );
}