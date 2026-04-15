import { userInfo } from "node:os";
import Card from "../Card";
import { format } from "date-fns";

export default function ReferralsMember({ userData, dashboardData }) {

    const referrals = dashboardData?.referredMembers || [];

    return (
        <div>
            <p>Your Referral Code: {userData?.userInfo?.referral_code}</p>

            <div className="grid grid-cols-2 gap-5 mt-5">
                <Card title="Total Referred" value={dashboardData?.totalReferredMembers} info=""/>
                <Card title="Pending" value={dashboardData?.pendingCount} info=""/>
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
                    <span
                        className={
                            user.status === "approved"
                            ? "text-green-600"
                            : user.status === "pending"
                            ? "text-orange-500"
                            : user.status === "declined"
                            ? "text-red-600"
                            : ""
                        }
                        >
                        {user.status}
                    </span>
                </div>
            ))}
        </div>
    );
}