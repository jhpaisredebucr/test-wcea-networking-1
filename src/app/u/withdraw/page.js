'use client'

import { useEffect, useState } from "react";

export default function Withdraw() {

  const [method, setMethod] = useState("");
  const [amount, setAmount] = useState("");
  const [accountInfo, setAccountInfo] = useState(""); // gcash number / bank acct etc
  const [userData, setUserData] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  // -----------------------
  // FETCH USER
  // -----------------------
  useEffect(() => {
    const loadData = async () => {
      try {
        setInitialLoading(true);
        const res = await fetch("/api/users");
        const data = await res.json();

        if (!data.success) throw new Error("Failed to load user");

        setUserData(data);

      } catch (err) {
        console.error(err);
        setError("Failed to load user data");
      } finally {
        setInitialLoading(false);
      }
    };

    loadData();
  }, []);

  if (initialLoading) {
    return (
      <div className="w-full flex">
        <div className="w-full ml-56 px-20 py-7 bg-gray-100 min-h-screen flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
            <div className="text-xl text-gray-700">Loading...</div>
          </div>
        </div>
      </div>
    );
  }

  if (error && !success) {
    return (
      <div className="w-full flex">
        <div className="w-full ml-56 px-20 py-7 bg-gray-100 min-h-screen flex items-center justify-center">
          <div className="text-red-500 text-xl max-w-md text-center flex flex-col items-center gap-4">
            <p>{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  // -----------------------
  // VALIDATE + SUBMIT
  // -----------------------
  async function SubmitWithdraw() {

    setError(null);

    if (!userData?.userInfo?.id) {
      setError("User not loaded.");
      return;
    }

    if (!method) {
      setError("Select withdrawal method.");
      return;
    }

    if (!amount) {
      setError("Enter amount.");
      return;
    }

    if (!accountInfo) {
      setError("Enter account details.");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/portal/member/withdrawals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          user_id: userData.userInfo.id,
          type: "withdrawal",
          amount,
          payment_method: method,
          account_info: accountInfo
        })
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Withdrawal failed.");
        return;
      }

      setSuccess(true);
      setMethod("");
      setAmount("");
      setAccountInfo("");

    } catch (err) {
      setError("Network error.");
    } finally {
      setLoading(false);
    }
  }

  // -----------------------
  // UI
  // -----------------------
  return (
    <div className="flex justify-center mt-10 py-7">

      <div className="bg-white shadow-lg rounded-xl p-6 w-[420px]">

        <h2 className="text-xl font-bold text-center">
          Withdraw Funds (Not Yet Working)
        </h2>

        {/* METHOD */}
        <div className="mt-5">
          <p className="text-sm">Withdrawal Method</p>

          <select
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            className="w-full border p-2 mt-1 rounded-lg"
          >
            <option value="">Select method</option>
            <option value="gcash">GCash</option>
            <option value="maya">PayMaya</option>
            <option value="bank">Bank Transfer</option>
          </select>
        </div>

        {/* ACCOUNT INFO */}
        <div className="mt-5">
          <p className="text-sm">
            {method === "bank"
              ? "Bank Account Details"
              : "Account Number / Mobile Number"}
          </p>

          <input
            type="text"
            value={accountInfo}
            placeholder={
              method === "bank"
                ? "Enter bank account number"
                : "Enter account number"
            }
            onChange={(e) => setAccountInfo(e.target.value)}
            className="w-full border p-2 mt-1 rounded-lg"
          />
        </div>

        {/* AMOUNT */}
        <div className="mt-5">
          <p className="text-sm">Withdrawal Amount</p>

          <input
            type="number"
            value={amount}
            placeholder="Enter amount"
            onChange={(e) => setAmount(e.target.value)}
            className="w-full border p-2 mt-1 rounded-lg"
          />
        </div>

        {/* ERROR */}
        {error && (
          <p className="mt-4 text-red-500 text-sm bg-red-50 p-2 rounded">
            {error}
          </p>
        )}

        {/* SUCCESS */}
        {success && (
          <p className="mt-4 text-green-600 text-sm bg-green-50 p-2 rounded">
            Withdrawal request submitted successfully.
          </p>
        )}

        {/* BUTTON */}
        {!success && (
          <button
            onClick={SubmitWithdraw}
            disabled={loading}
            className="mt-6 w-full bg-blue-500 text-white py-2 rounded-lg disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Submit Withdrawal"}
          </button>
        )}

      </div>
    </div>
  );
}