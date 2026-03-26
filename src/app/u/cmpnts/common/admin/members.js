import Card from "../card";
import { format } from "date-fns";

export default function MembersAdmin({ userInfo, dashboardData }) {

    const referrals = [
        ...(dashboardData?.pendingRequest || []),
        ...(dashboardData?.approvedMembers || [])
    ];

    async function Approve(userID, plan, amount) {
        async function ApprovePendingUser() {
            const res = await fetch("/api/portal/admin/members", {
                method: "PATCH",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({userId: userID})
            });

            const data = await res.json();
            console.log(data);
        }

        async function Transaction() {
            const res = await fetch("/api/portal/admin/transactions", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({ user_id: userID, type: plan, amount })
            });

            const data = await res.json();
            console.log(data);
        }

        ApprovePendingUser();
    }

    return (
        <div>
            <div className="grid grid-cols-2 gap-5">
                <Card title="Total Members" value={dashboardData?.totalMembers} info=""/>
                <Card title="Pending" value={dashboardData?.totalRequest} info=""/>
            </div>

            <div className="grid grid-cols-4 shadow-sm p-5 mt-5 rounded-lg bg-white font-semibold">
                <div>Username</div>
                <div>Full Name</div>
                <div>Date Joined</div>
                <div>Status</div>
            </div>

            {referrals.map((user, index) => (
                <div
                    key={index}
                    className="grid grid-cols-4 shadow-sm p-5 rounded-lg bg-white mt-2"
                >
                    <div>{user.username}</div>
                    <div>{user.first_name} {user.last_name}</div>
                    <div>{format(new Date(user.created_at), "MMM dd, yyyy")}</div>
                    <div className="flex items-center justify-between">
                        {user.status}
                        {user.status === "pending" &&
                        <button onClick={() => Approve(user.id, user.plan)} className="p-1 rounded-sm bg-blue-400 text-white text-sm">
                            Approve
                        </button>}
                    </div>
                </div>
            ))}
        </div>
    );
}