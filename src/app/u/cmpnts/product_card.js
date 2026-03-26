import Profile from "@/app/cmpnts/ui/profile"
import { useState } from "react";

export default function ProductCard({ products, userInfo }) {
    async function Buy() {
        const data = {
            user_id: userInfo?.id,
            product_id: products?.id,
            product_name: products?.product_name
        };

        const res = await fetch("/api/products/buy", {
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify(data)
        });
    }

    return (
        <div>
            <div className="h-65 p-5 rounded-lg bg-white">
                <Profile first_name="Keisac" last_name="Buta"/>
                <p className="font-bold my-5">{products?.product_name}</p>
                <p>{products?.description}</p>
                <p>Price: {products?.price}</p>
                <button onClick={Buy} className="w-full p-3 mt-4 rounded-2xl bg-blue-400">Buy</button>
            </div>
        </div>
    )
}