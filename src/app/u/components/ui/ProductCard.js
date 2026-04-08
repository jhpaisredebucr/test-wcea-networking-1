import Image from "next/image";

export default function ProductCard({ products, userData, setBuying, setSelectedProduct }) {
    async function Buy() {
        setBuying(true);
        const data = {
            user_id: userData?.userInfo?.id,
            product_id: products?.id,
            products: products
        };
        setSelectedProduct(data);
    }

    return (
        <div className="
            group
            p-4 rounded-xl bg-white border-0 border-(--primary)
            flex flex-col gap-4
            transition duration-200 hover:scale-101 hover:border hover:shadow-lg
        ">
            {/* Image — full width */}
            <div className="overflow-hidden rounded-lg w-full h-40">
                <Image 
                    src="/images/example.jpg" 
                    alt="Product Picture" 
                    width={400} 
                    height={160} 
                    className="w-full h-full object-cover transition duration-300 ease-in-out group-hover:scale-110"
                />
            </div>

            {/* Content */}
            <div className="flex flex-col gap-2 flex-1">
                <p className="font-bold">{products?.product_name}</p>
                <p className="text-sm text-gray-400">{products?.description}</p>
                <p className="text-sm">Price: ₱{products?.price}</p>
            </div>

            {/* Button — full width */}
            <button 
                onClick={Buy} 
                className="cursor-pointer w-full px-5 py-3 rounded-xl bg-blue-500 text-white"
            >
                Buy
            </button>
        </div>
    )
}