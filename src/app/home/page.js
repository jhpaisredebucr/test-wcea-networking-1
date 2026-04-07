'use client"'

import Badge from "../components/ui/Badge"
import { cookies } from "next/headers"

export default function Page() {
    const cookieStore = cookies();
    const token = cookieStore.get(`token`);

    console.log("Token from cookies:", token);

    return (
        <div className="align-center text-center flex-wrap:wrap justify-center -center h-screen min-w-screen">
            <h1> Welcome </h1>
            <Badge>Badge!</Badge>
            <p>Cookies: {token}</p>
        </div>
    )
}