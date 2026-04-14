"use client";

export default function DeleteConfirmModal({ isOpen, onClose, onConfirm }) {

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

            <div className="bg-white w-80 p-6 rounded-lg shadow-lg flex flex-col gap-5">

                {/* TITLE */}
                <p className="text-lg font-bold">
                    Delete Announcement?
                </p>

                <p className="text-sm text-gray-500">
                    Are you sure you want to delete this post? This action cannot be undone.
                </p>

                {/* BUTTONS */}
                <div className="flex justify-end gap-3">

                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={() => {
                            onConfirm();
                            onClose();
                        }}
                        className="px-4 py-2 rounded-lg bg-red-400 text-white hover:opacity-90 transition"
                    >
                        Delete
                    </button>

                </div>

            </div>
        </div>
    );
}