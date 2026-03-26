import Image from "next/image"

export default function OrderCard({orders}) {
    return (
        <div>
            <div className="grid grid-cols-4 items-center p-5 rounded-lg bg-white">
                <div className="flex col-span-2">
                    <Image src="/images/example.jpg" alt="Product Picture" width={100} height={60} className="rounded-sm mr-5"/>
                    <div>
                        <p className="text-lg font-bold">{orders?.product_name}</p>
                        <p>Qty: 5</p>
                    </div>
                </div>
                <div>
                    <p className="text-sm text-gray-400">Price</p>
                    <p className="text-yellow-400">$100</p>
                </div>
                <div>
                    <p className="text-sm text-gray-400">Status</p>
                    <p className="text-yellow-400">Pending</p>
                </div>
            </div>
        </div>
    )
}