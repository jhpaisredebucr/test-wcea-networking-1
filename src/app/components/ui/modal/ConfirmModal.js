"use client";

export default function ConfirmModal({ isOpen, onClose, onConfirm, children, title, content, button, buttonColor="bg-blue-500" }) {

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

            <div className="bg-white w-80 p-6 rounded-lg shadow-lg flex flex-col gap-5">
                {children}
                {/* TITLE */}
                <p className="text-lg font-bold">
                    {title}
                </p>
                <p className="text-sm text-gray-500">
                    {content}
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
                        className={`px-4 py-2 rounded-lg ${buttonColor} text-white hover:opacity-90 transition`}
                    >
                        {button}
                    </button>

                </div>

            </div>
        </div>
    );
}