import { useState } from "react";

export default function BuyModal({ setBuying, product, dashboardData, userData }) {
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    function Close() {
        setBuying(false);
    }

    async function Buy() {
        setError(null);

        // // Not logged in
        // if (!userData || !product?.user_id) {
        //     setError("You must be logged in to make a purchase.");
        //     return;
        // }

        // Balance is 0 or not enough
        if (!dashboardData?.userBalance || dashboardData?.userBalance <= 0) {
            setError("Your wallet balance is empty.");
            return;
        }

        if (dashboardData?.userBalance < product?.products?.price) {
            setError("Not enough balance to complete this purchase.");
            return;
        }

        try {
            setLoading(true);
            const res = await fetch("/api/products/buy", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ 
                    user_id: product?.user_id, 
                    product_id: product?.product_id 
                })
            });

            const data = await res.json();

            // Already bought
            if (res.status === 409) {
                setError("You have already purchased this product.");
                return;
            }

            // Other API errors
            if (!res.ok) {
                setError(data?.message || "Something went wrong. Please try again.");
                return;
            }

            setSuccess(true);

        } catch (err) {
            setError("Network error. Please check your connection and try again.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
            <div className="bg-white p-6 rounded-lg shadow-lg w-110">
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

                {/* Payment */}
                <div>
                    <p className="mt-7 text-sm">Payment Method</p>
                    <p className="border p-2 mt-2 rounded-lg">
                        Wallet Balance: ₱{dashboardData?.userBalance ?? 0}
                    </p>
                </div>

                {/* Error message */}
                {error && (
                    <p className="mt-3 text-sm text-red-500 bg-red-50 border border-red-200 rounded-lg p-2">
                        {error}
                    </p>
                )}

                {/* Success message */}
                {success && (
                    <p className="mt-3 text-sm text-green-600 bg-green-50 border border-green-200 rounded-lg p-2">
                        Purchase successful!
                    </p>
                )}

                {/* Buttons */}
                <div className="mt-6 flex justify-end space-x-3">
                    {!success && (
                        <button
                            onClick={Buy}
                            disabled={loading}
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? "Processing..." : "Buy"}
                        </button>
                    )}
                    <button
                        onClick={Close}
                        className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition"
                    >
                        {success ? "Done" : "Close"}
                    </button>
                </div>
            </div>
        </div>
    )
}