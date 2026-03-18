import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Dashboard from "../page";

export default function Page() {
    const token = cookies().get("token")?.value;

    // 🚫 Not logged in → redirect
    if (!token) {
        redirect("/login");
    }

    let user;

    try {
        user = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        redirect("/login");
    }

    return <Dashboard user={user} />;
}