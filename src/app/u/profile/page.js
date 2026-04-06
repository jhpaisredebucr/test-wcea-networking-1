"use client";
import { useState } from "react";
import Image from "next/image";
import Input from "../../components/common/input";
import Button from "../../components/common/button";

export default function Profile() {
    // Simulate getting user info dynamically
    const [name, setName] = useState("name");
    const [bio, setBio] = useState("Bio.");

    return (
        <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded-xl shadow-md text-center">
            <div className="flex justify-center mb-4">
                <Image
                    src=""
                    alt="Avatar"
                    width={100}
                    height={100}
                    className="rounded-full"
                />
            </div>

            <h2 className="text-2xl font-bold mb-1">{name}</h2>
            <p className="text-gray-500 mb-4">@{name.toLowerCase()}</p>
            <p className="mb-6">{bio}</p>

            <div className="flex flex-col gap-3">
                <Input
                    label="Edit Name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <Button onClick={() => alert(`Saved name: ${name}`)}>Save</Button>
            </div>
        </div>
    );
}