//CLIENT COMPONENT

"use client";

import { CldImage } from "next-cloudinary";

export default function ApproveModal({
  isOpen,
  onClose,
  onConfirm,
  transaction,
  loading
}) {

  if (!isOpen || !transaction) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

      <div className="bg-white w-[400px] p-5 rounded-lg shadow-lg">

        <h2 className="text-lg font-semibold mb-3">
          Confirm Approval
        </h2>

        {/* PROOF */}
        {transaction.proof && (
          <CldImage
            src={transaction.proof}
            width={200}
            height={200}
            alt="proof"
          />
        )}

        <p className="text-sm text-gray-600 mb-4">
          Approve ₱{transaction.amount} transaction?
        </p>

        <div className="flex justify-end gap-2">

          <button
            onClick={onClose}
            className="px-3 py-1 bg-gray-200 rounded"
          >
            Cancel
          </button>

          <button
            onClick={() => onConfirm(transaction.id)}
            disabled={loading}
            className="px-3 py-1 bg-green-600 text-white rounded"
          >
            {loading ? "Approving..." : "Confirm"}
          </button>

        </div>

      </div>

    </div>
  );
}