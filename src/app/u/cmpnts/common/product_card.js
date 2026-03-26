import Image from "next/image";

export default function ProductCard({ products, userInfo }) {
    async function Buy() {
        const data = {
            user_id: userInfo?.id,
            product_id: products?.id,
        };

        const res = await fetch("/api/products/buy", {
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify(data)
        });
    }

    return (
        <div>
            <div className="h-90 p-5 rounded-lg bg-white">
                <Image src="/images/example.jpg" alt="Product Picture" width={200} height={60} className="rounded-sm"/>
                <p className="font-bold my-5">{products?.product_name}</p>
                <p>{products?.description}</p>
                <p>Price: {products?.price}</p>
                <button onClick={Buy} className="w-full p-3 mt-4 rounded-2xl bg-blue-400">Buy</button>
            </div>
        </div>
    )
}