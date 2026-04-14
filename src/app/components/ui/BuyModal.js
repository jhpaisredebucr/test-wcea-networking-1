import { useState } from "react";

export default function BuyModal({
  setBuying,
  product: cart,
  dashboardData,
  userData
}) {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  function Close() {
    setBuying(false);
  }

  // ----------------------------
  // TOTAL PRICE FROM CART
  // ----------------------------
  const total = (cart || []).reduce((sum, item) => {
    const price = Number(item.price);
    const qty = Number(item.quantity);

    if (isNaN(price) || isNaN(qty)) return sum;

    return sum + price * qty;
  }, 0);

  // ----------------------------
  // BUY CART
  // ----------------------------
  async function Buy() {
    setError(null);

    if (!cart || cart.length === 0) {
      setError("Cart is empty.");
      return;
    }

    if (!dashboardData?.userBalance || dashboardData?.userBalance <= 0) {
      setError("Your wallet balance is empty.");
      return;
    }

    if (dashboardData.userBalance < total) {
      setError("Not enough balance to complete this purchase.");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/products/buy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: userData?.userInfo?.id,
          cart: cart, //  send whole cart
          total: total
        })
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data?.message || "Something went wrong.");
        return;
      }

      setSuccess(true);

    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  // ----------------------------
  // UI
  // ----------------------------
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[450px]">

        <h2 className="text-xl font-bold text-center">
          Confirm Your Order
        </h2>

        {/* CART ITEMS */}
        <div className="mt-6 space-y-3 max-h-60 overflow-y-auto">
          {cart?.map((item) => (
            <div
              key={item.id}
              className="flex justify-between text-sm border-b pb-2"
            >
              <p>
                {item.product_name} × {item.quantity}
              </p>
              <p>₱{item.price * item.quantity}</p>
            </div>
          ))}
        </div>

        {/* TOTAL */}
        <div className="mt-4 flex justify-between font-bold text-lg">
          <p>Total:</p>
          <p>₱{total}</p>
        </div>

        {/* WALLET */}
        <div className="mt-5">
          <p className="text-sm">Wallet Balance</p>
          <p className="border p-2 mt-1 rounded-lg">
            ₱{dashboardData?.userBalance ?? 0}
          </p>
        </div>

        {/* ERROR */}
        {error && (
          <p className="mt-3 text-sm text-red-500 bg-red-50 p-2 rounded-lg">
            {error}
          </p>
        )}

        {/* SUCCESS */}
        {success && (
          <p className="mt-3 text-sm text-green-600 bg-green-50 p-2 rounded-lg">
            Purchase successful!
          </p>
        )}

        {/* BUTTONS */}
        <div className="mt-6 flex justify-end gap-3">
          {!success && (
            <button
              onClick={Buy}
              disabled={loading}
              className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
            >
              {loading ? "Processing..." : "Buy All"}
            </button>
          )}

          <button
            onClick={Close}
            className="px-4 py-2 bg-gray-300 rounded"
          >
            {success ? "Done" : "Close"}
          </button>
        </div>
      </div>
    </div>
  );
}