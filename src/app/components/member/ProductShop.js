'use client';

import { useEffect, useState } from "react";
import ProductCard from "@/app/components/card/ProductCard";
import BuyModal from "@/app/components/modal/BuyModal";

export default function ProductShop({ products, dashboardData, userData }) {
  const [isBuying, setBuying] = useState(false);
  const [cart, setCart] = useState([]);

  function AddToCart(product, status) {
    const cleanProduct = {
      ...product,
      price: Number(product.price),
      quantity: 1,
    };

    setCart((prev) => {
      const existing = prev.find((item) => item.id === cleanProduct.id);

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

  const total = cart.reduce((sum, item) => {
    const price = Number(item.price);
    const qty = Number(item.quantity);
    if (isNaN(price) || isNaN(qty)) return sum;
    return sum + price * qty;
  }, 0);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div>
      {isBuying && (
        <BuyModal
          setBuying={setBuying}
          product={cart}
          userData={userData}
          dashboardData={dashboardData}
        />
      )}

      <div className="mb-5 p-3 text-blue-600 border border-blue-400 rounded-2xl flex justify-between items-center">
        Explore and shop high-quality premium products!

        {cart.length !== 0 && (
          <button
            className="text-white text-lg font-bold bg-blue-500 py-1 px-4 rounded-lg"
            onClick={() => setBuying(true)}
          >
            Cart ({totalItems}) ₱{total}
          </button>
        )}
      </div>

      {/* PRODUCT GRID (merged from ProductsMember) */}
      {products.length === 0 ? (
        <p>Loading products...</p>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              products={product}
              userData={userData}
              AddToCart={AddToCart}
            />
          ))}
        </div>
      )}
    </div>
  );
}