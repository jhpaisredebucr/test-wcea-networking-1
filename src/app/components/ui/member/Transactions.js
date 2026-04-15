"use client";

import { useState } from "react";
import { format } from "date-fns";
import ApproveModal from "./ApproveModal";

export default function Transactions({ transactions, userData, limit=20 }) {

  const [selectedTx, setSelectedTx] = useState(null);
  const [loading, setLoading] = useState(false);

  async function Approve(transactionId) {
    setLoading(true);

    try {
      const res = await fetch("/api/transaction/approve", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ transactionId })
      });

      const data = await res.json();
      console.log(data);

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      setSelectedTx(null);
    }
  }

  return (
    <div>

      {/* HEADER */}
      <div className="grid grid-cols-5 p-5 mt-5 bg-white font-semibold rounded-lg shadow-sm">
        <div>Date</div>
        <div>Type</div>
        <div>Amount</div>
        <div>Payment Method</div>
        <div>Status</div>
      </div>

      {/* ROWS */}
      {transactions.slice(0, limit).map((t, i) => (
        <div
          key={i}
          className="grid grid-cols-5 p-5 mt-2 bg-white rounded-lg shadow-sm"
        >
          <div>{format(new Date(t.created_at), "MMM dd, yyyy")}</div>

          <div>
            {t.type.charAt(0).toUpperCase() + t.type.slice(1)}
          </div>

          <div>₱{t.amount}</div>

          <div>{t.payment_method}</div>

          <div className="flex justify-between items-center">

            <span
              className={
                t.status === "approved"
                  ? "text-green-600"
                  : t.status === "pending"
                  ? "text-yellow-500"
                  : "text-red-600"
              }
            >
              {t.status}
            </span>

            {t.status === "pending" && userData?.userInfo?.role === "admin" && (
              <button
                onClick={() => setSelectedTx(t)}
                className="px-2 py-1 bg-(--primary) text-white rounded"
              >
                Approve
              </button>
            )}

          </div>
        </div>
      ))}

      {/* MODAL COMPONENT */}
      <ApproveModal
        isOpen={!!selectedTx}
        transaction={selectedTx}
        loading={loading}
        onClose={() => setSelectedTx(null)}
        onConfirm={Approve}
      />

    </div>
  );
}