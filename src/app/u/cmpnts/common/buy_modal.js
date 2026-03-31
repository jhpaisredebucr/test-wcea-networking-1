import { useState } from "react";

export default function BuyModal({ setBuying, product, dashboardData }) {
    const [noMoney, setNoMoney] = useState(false);

    function Close() {
        setBuying(false);
    }

    async function Buy() {
        console.log(product);
        if (dashboardData?.userBalance < product?.products?.price) {
            setNoMoney(true);
            return
        }

        const res = await fetch("/api/products/buy", { 
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify({user_id: product?.user_id, product_id: product?.product_id}) 
        });
        const data = await res.json();
        
        console.log(data);
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
            <div className="bg-white p-6 rounded-lg shadow-lg w-110">
                {/* Modal Header */}
                <h2 className="text-xl font-bold text-center">Confirm Your Order</h2>

                {/* Product Info */}
                <div className="mt-10 space-y-2">
                    <div className="flex justify-between items-center">
                        <p className="font-medium">{product?.products?.product_name}</p>
                        <p className="font-medium">₱{product?.products?.price}</p>
                    </div>
                    <hr className="my-2" />
                    <div className="flex justify-between items-center">
                        <p className="text-lg font-semibold">Total:</p>
                        <p className="text-lg font-semibold">₱{product?.products?.price}</p>
                    </div>
                </div>

                <div>
                    <p className="mt-7 text-sm">Payment Method</p>
                    <p className="border p-2 mt-2 rounded-lg">Wallet Balance: ₱{dashboardData?.userBalance}</p>
                    {noMoney && <p className="text-sm text-red-500 p-2">Not enough balance</p>}
                </div>

                {/* Buttons */}
                <div className="mt-6 flex justify-end space-x-3">
                    <button 
                        onClick={Buy} 
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                    >
                        Buy
                    </button>
                    <button 
                        onClick={Close} 
                        className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    )
}