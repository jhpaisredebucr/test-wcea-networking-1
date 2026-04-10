'use client';

import { useEffect, useState } from "react";
import ProductsMember from "@/app/u/components/member/ProductShop";

export default function Page() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/api/products")
      .then(res => res.json())
      .then(d => setProducts(d.products));
  }, []);

  return (
    <>
      <h1 className="text-3xl font-semibold mb-6">Product Shop</h1>
      <ProductsMember products={products} />
    </>
  );
}