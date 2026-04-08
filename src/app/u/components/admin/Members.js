import Card from "../ui/Card";
import { format } from "date-fns";

export default function MembersAdmin({ userInfo, dashboardData }) {

    const referrals = [
        ...(dashboardData?.pendingRequest || []),
        ...(dashboardData?.approvedMembers || [])
    ];

    async function Approve(userID, plan, referred_by) {
        let initialAmount = 0;
        if (plan === "1") initialAmount = 300;
        else if (plan === "2") initialAmount = 900;
        else if (plan === "3") initialAmount = 1500;

        const amount = initialAmount * 0.20;

        console.log(referred_by, userID, amount);
        const resApprove  = await fetch("/api/portal/admin/members", {
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({userId: userID})
        });

        const dataApprove  = await resApprove.json();
        console.log(dataApprove);


        //TRANSACTIONS
        const resTransaction  = await fetch("/api/portal/admin/transactions", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ user_id: userID, type: "Plan", amount: initialAmount })
        });

        const dataTransaction  = await resTransaction.json();
        console.log(dataTransaction);

        //REFERAL REWARDS
        const resReferral  = await fetch("/api/portal/admin/transactions/referral-reward", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ referral_code: referred_by, referred_id: userID, reward_amount: amount })
        });

        const dataReferral  = await resReferral.json();
        console.log(dataReferral);

        
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
                        <button onClick={() => Approve(user.id, user.plan, user.referred_by)} className="p-1 rounded-sm bg-blue-400 text-white text-sm">
                            Approve
                        </button>}
                    </div>
                </div>
            ))}
        </div>
    );
}