"use client"

import ProductCard from "../card/ProductCard";
import { useState } from "react";

export default function ProductsMember({ products, userData, dashboardData, AddToCart }) {
    
    if (products.length === 0) {
        return <p>Loading products...</p>;
    }

    
    return (
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
    )
}