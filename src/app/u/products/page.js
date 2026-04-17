'use client';

import { useEffect, useState } from "react";
import ProductsMember from "@/app/components/ui/member/ProductShop";
import BuyModal from "@/app/components/modal/BuyModal";

export default function Page() {
  const [products, setProducts] = useState([]);
  const [dashboardData, setDashboardData] = useState(null);
  const [userData, setUserData] = useState(null);
  const [isBuying, setBuying] = useState(false);
  const [loading, setLoading] = useState(true);

  const [cart, setCart] = useState([]);

  // FETCH HELPER
  const fetchJson = async (url) => {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
  };

  // LOAD DATA
  useEffect(() => {
    const loadData = async () => {
      try {
        const userRes = await fetchJson("/api/users");

        if (!userRes.success) {
          throw new Error("Failed to load user");
        }

        setUserData(userRes);

        fetch("/api/products")
          .then((res) => res.json())
          .then((d) => setProducts(d.products));

        const dashRes = await fetchJson(
          `/api/portal/member?userReferralCode=${userRes.userInfo.referral_code}`
        );

        setDashboardData(dashRes.dashboardData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // ADD / REMOVE CART
  function AddToCart(product, status) {
  const cleanProduct = {
    ...product,
    price: Number(product.price),
    quantity: 1,
  };

  setCart((prev) => {
    const existing = prev.find(
      (item) => item.id === cleanProduct.id
    );

    // ADD
    if (status !== "del") {
      if (existing) {
        return prev.map((item) =>
          item.id === cleanProduct.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prev, cleanProduct];
    }

    // REMOVE
    if (existing) {
      return prev
        .map((item) =>
          item.id === cleanProduct.id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0);
    }

    return prev;
  });
}

  // TOTAL PRICE (SAFE)
  const total = cart.reduce((sum, item) => {
    const price = Number(item.price);
    const qty = Number(item.quantity);

    if (isNaN(price) || isNaN(qty)) return sum;

    return sum + price * qty;
  }, 0);

  // TOTAL ITEMS
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  // function debug() {
  //   console.log(cart);
  // }

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

  // UI
  return (
    <div className="py-7">
      {isBuying === true && <BuyModal setBuying={setBuying} product={cart} userData={userData} dashboardData={dashboardData}/>}
      <div className="flex justify-between items-center">
        {/* <h1 className="text-3xl font-semibold mb-5">Product Shop</h1> */}
      </div>
      <div className="mb-5 p-3 text-blue-500 border border-blue-300 rounded-2xl flex justify-between items-center">
        Explore and shop high-quality premium products
        {cart.length !== 0 && 
        <button className="text-white text-lg font-bold bg-blue-500 py-1 px-4 rounded-lg" onClick={() => setBuying(true)}>
          Cart ({totalItems}) ₱{total}
        </button>}
      </div>

      {/* <button onClick={debug}>DEBUG</button> */}
      <ProductsMember
        products={products}
        dashboardData={dashboardData}
        userData={userData}
        AddToCart={AddToCart}
      />
    </div>
  );
}
