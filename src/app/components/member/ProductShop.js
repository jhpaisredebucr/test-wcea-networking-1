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

      <div className="mb-5 p-3 text-blue-600 border border-blue-400 rounded-2xl flex flex-col gap-2 sm:flex-row sm:justify-between sm:items-center">
        <span>Explore and shop high-quality premium products!</span>

        {cart.length !== 0 && (
          <button
            className="text-white text-base sm:text-lg font-bold bg-blue-500 py-1 px-4 rounded-lg w-full sm:w-auto"
            onClick={() => setBuying(true)}
          >
            Cart ({totalItems}) ₱{total}
          </button>
        )}
      </div>

      {/* PRODUCT GRID (merged from ProductsMember) */}
      {products.length === 0 ? (
        <p className="text-center text-gray-500">No products loaded</p>
      ) : (
        <div className="px-1 sm:px-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
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