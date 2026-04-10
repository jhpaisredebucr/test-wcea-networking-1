'use client';

import { useEffect, useState } from "react";
import OrdersMember from "@/app/u/components/member/MyOrders";

export default function Page() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("/api/products/orders")
      .then(res => res.json())
      .then(d => setOrders(d.orders));
  }, []);

  return (
    <>
      <h1 className="text-3xl font-semibold mb-6">My Orders</h1>
      <OrdersMember orders={orders} />
    </>
  );
}