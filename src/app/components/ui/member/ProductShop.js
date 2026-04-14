"use client"

import ProductCard from "../ProductCard";
import { useState } from "react";

export default function ProductsMember({ products, userData, dashboardData, AddToCart }) {

    if (!products) {
        return <p>Loading products...</p>;
    }

    
    return (
        <div className="grid grid-cols-4 gap-4">
            
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