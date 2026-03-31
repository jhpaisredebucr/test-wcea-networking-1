"use client"
import BuyModal from "../buy_modal";
import ProductCard from "../product_card";
import { useState } from "react";

export default function ProductsMember({ products, userData }) {
    const [buying, setBuying] = useState(false);

    if (!products) {
        return <p>Loading products...</p>;
    }
    
    return (
        <div className="grid grid-cols-4">
            {buying === true && <BuyModal setBuying={setBuying}/>}
            <div className="space-y-4">
                {products.map((product) => (
                    <ProductCard
                        key={product.id}
                        products={product}
                        userData={userData}
                        setBuying={setBuying}
                    />
                ))}
            </div>
        </div>
    )
}