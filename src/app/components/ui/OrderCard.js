import { CldImage } from "next-cloudinary";
import Image from "next/image"

export default function OrderCard({orders, products}) {
    const product = products.find(p => p.id === orders?.product_id);

    return (
        <div>
            <div className="grid grid-cols-4 items-center p-5 rounded-lg bg-white">
                <div className="flex col-span-2 items-center">
                    <CldImage src={product?.img_url} alt="Product Picture" width={100} height={60} className="rounded-sm mr-5 h-auto w-auto"/>
                    <div>
                        <p className="text-lg font-bold">{product?.product_name}</p>
                        <p>Qty: 1</p>
                    </div>
                </div>
                <div>
                    <p className="text-sm text-gray-400">Price</p>
                    <p className="text-blue-500">{product?.price}</p>
                </div>
                <div>
                    <p className="text-sm text-gray-400">Status</p>
                    <p className="text-yellow-400">{orders?.status}</p>
                </div>
            </div>
        </div>
    )
}