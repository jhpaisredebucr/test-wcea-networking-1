"use client"
import BuyModal from "../ui/BuyModal";
import ProductCard from "../ui/ProductCard";
import { useState } from "react";

export default function ProductsMember({ products, userData, dashboardData }) {
    const [buying, setBuying] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    if (!products) {
        return <p>Loading products...</p>;
    }
    
    return (
        <div className="grid grid-cols-4">
            {buying === true && selectedProduct && <BuyModal setBuying={setBuying} product={selectedProduct} userData={userData} dashboardData={dashboardData}/>}
            <div className="space-y-4">
                {products.map((product) => (
                    <ProductCard
                        key={product.id}
                        products={product}
                        userData={userData}
                        setBuying={setBuying}
                        setSelectedProduct={setSelectedProduct}
                    />
                ))}
            </div>
        </div>
    )
}