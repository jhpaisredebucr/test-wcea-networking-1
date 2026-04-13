"use client";

import { useState } from "react";

export default function AddAnnouncementModal({
    isOpen,
    onClose,
    onSuccess
}) {
    const [title, setTitle] = useState("");
    const [caption, setCaption] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);

    if (!isOpen) return null;

    async function handleSubmit(e) {
        e.preventDefault();

        if (!title || !caption || !description) {
            alert("Please complete all fields");
            return;
        }

        setLoading(true);

        try {
            const res = await fetch("/api/announcement/post", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    title,
                    caption,
                    description
                })
            });

            const data = await res.json();

            if (!res.ok) {
                alert(data.message);
                return;
            }

            setTitle("");
            setCaption("");
            setDescription("");

            onSuccess?.();
            onClose();

        } catch (err) {
            console.error(err);
            alert("Something went wrong");
        }

        setLoading(false);
    }

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

            <div className="bg-white w-[550px] rounded-xl shadow-lg p-6">

                <h2 className="text-xl font-semibold mb-4">
                    Add Announcement
                </h2>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                >

                    {/* TITLE */}
                    <input
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full border rounded-lg p-2"
                    />

                    {/* SHORT CAPTION */}
                    <input
                        type="text"
                        placeholder="Short caption (preview text)"
                        value={caption}
                        onChange={(e) => setCaption(e.target.value)}
                        className="w-full border rounded-lg p-2"
                    />

                    {/* LONG DESCRIPTION */}
                    <textarea
                        placeholder="Full announcement description"
                        value={description}
                        onChange={(e) =>
                            setDescription(e.target.value)
                        }
                        rows={6}
                        className="w-full border rounded-lg p-2"
                    />

                    <div className="flex justify-end gap-2">

                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 rounded bg-gray-200"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                            className="px-4 py-2 rounded bg-blue-500 text-white"
                        >
                            {loading
                                ? "Saving..."
                                : "Save Announcement"}
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}