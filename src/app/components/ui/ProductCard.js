import { CldImage } from "next-cloudinary";
import Image from "next/image";
import { useState } from "react";

export default function ProductCard({ products, userData, setBuying, setSelectedProduct, AddToCart }) {
    const data = {
        id: products.id,
        user_id: userData.userInfo.id,
        product_id: products.id,
        product_name: products.product_name,
        price: products.price
    }

    const isBuyingButtonClassName = "cursor-pointer w-full px-3 py-2 rounded-full bg-(--primary) text-white text-2xl font-bold"

    const [quantity, setQuantity] = useState(0);


    return (
        <div className="
            p-4 rounded-xl bg-white border-0 border-(--primary)
            flex flex-col gap-4 shadow-sm
            transition duration-300 hover:-translate-y-2 hover:border hover:shadow-lg
        ">
            {/* Image — full width */}
            <div className="overflow-hidden rounded-lg w-full h-40">
                <CldImage 
                    src={`/${products.img_url}`} 
                    alt="Product Picture" 
                    effect="brightness:100"
                    width={400} 
                    height={160} 
                    className="w-full h-full object-cover transition duration-300 ease-in-out hover:scale-110"
                />
            </div>

            {/* Content */}
            <div className="flex flex-col gap-2 flex-1">
                <p className="font-bold">{products?.product_name}</p>
                <p className="text-sm text-gray-400">{products?.description}</p>
                <p className="text-2xl text-[#465a7b] font-bold">₱{products?.price}.00</p>
            </div>

            {quantity === 0 && <button 
                onClick={() => {
                    AddToCart(data);
                    setQuantity(quantity + 1)
                }} 
                className="cursor-pointer w-full px-5 py-2 rounded-xl border border-(--primary)"
            >
                Buy
            </button>}

            {quantity > 0 && 
            <div className="grid grid-cols-3 items-center place-items-center">
                <Image src="/icons/minus-circle-filled.svg" alt="icon" width={40} height={40}
                    onClick={() => {
                        AddToCart(data, "del");
                        setQuantity(quantity - 1)
                    }} 
                />
            

                <p className="text-lg font-bold">{quantity}</p>

                <Image src="/icons/plus-circle-filled.svg" alt="icon" width={40} height={40}
                    onClick={() => {
                        AddToCart(data);
                        setQuantity(quantity + 1)
                    }} 
                />
            </div>}
        </div>
    )
}