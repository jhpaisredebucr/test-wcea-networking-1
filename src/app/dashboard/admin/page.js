import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Dashboard from "../DashboardUI";

export const dynamic = "force-dynamic";

export default function Page() {
    const token = cookies().get("token")?.value;

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