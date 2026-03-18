import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import Dashboard from "@/app/dashboard/admin/page";

export default function UserData() {
    const token = cookies().get("token")?.value;

    if (!token) return <div>Not logged in</div>;

    const user = jwt.verify(token, process.env.JWT_SECRET);

    return <Dashboard user={user} />;
}