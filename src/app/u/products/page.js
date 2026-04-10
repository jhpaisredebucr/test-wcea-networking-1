'use client';

import { useEffect, useState } from "react";
import ProductsMember from "@/app/u/components/member/ProductShop";

export default function Page() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const loadData = async () => {
      try {
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
      <h1 className="text-3xl font-semibold mb-6">Product Shop</h1>
      <ProductsMember products={products} />
    </>
  );
}