'use client';

import { useEffect, useState } from "react";
import OrdersMember from "@/app/components/ui/member/MyOrders";

export default function Page() {

  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  // -----------------------
  // FETCH HELPER
  // -----------------------
  const fetchJson = async (url) => {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
  };

  // -----------------------
  // LOAD DATA
  // -----------------------
  useEffect(() => {
    const loadData = async () => {
      try {

        setLoading(true);

        // 🔥 Run all requests in parallel (faster)
        const [userRes, productsRes, ordersRes] = await Promise.all([
          fetchJson("/api/users"),
          fetchJson("/api/products"),
          fetchJson("/api/products/orders")
        ]);

        // -----------------------
        // USER
        // -----------------------
        if (!userRes.success) {
          throw new Error("Failed to load user");
        }

        setUserData(userRes);

        // -----------------------
        // PRODUCTS
        // -----------------------
        const productsData = productsRes.products || [];
        setProducts(productsData);

        // -----------------------
        // ORDERS
        // -----------------------
        const ordersData = ordersRes.orders || [];
        setOrders(ordersData);

        // -----------------------
        // DEBUG (REAL VALUES)
        // -----------------------
        console.log("USER:", userRes);
        console.log("PRODUCTS:", productsData);
        console.log("ORDERS:", ordersData);

      } catch (err) {
        console.error("Load error:", err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // -----------------------
  // LOADING UI
  // -----------------------
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

  // -----------------------
  // MAIN UI
  // -----------------------
  return (
    <div className="py-7">
      {/* <h1 className="text-3xl font-semibold mb-6">My Orders</h1> */}

      <OrdersMember
        orders={orders}
        products={products}
        userData={userData}
      />
    </div>
  );
}