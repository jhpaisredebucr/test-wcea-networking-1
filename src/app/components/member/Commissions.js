import { format } from "date-fns";

export default function Commissions({commissions}) {

    return (
        <div>
            <div className="grid grid-cols-4 shadow-sm p-5 mt-5 rounded-lg bg-white font-semibold">
                <div>Date</div>
                <div>Name</div>
                <div>Commission</div>
                <div>Status</div>
            </div>

            {commissions.map((commission, index) => (
                <div
                    key={index}
                    className="grid grid-cols-4 shadow-sm p-5 rounded-lg bg-white mt-2"
                >
                    <div>{format(new Date(commission.created_at), "MMM dd, yyyy")}</div>
                    <div>{commission.referred_first_name} {commission.referred_last_name}</div>
                    <div>{commission.reward_amount} CREDITS</div>
                    <span
                      className={
                        commission.status === "approved"
                          ? "text-green-600"
                          : commission.status === "pending"
                          ? "text-orange-500"
                          : commission.status === "declined"
                          ? "text-red-600"
                          : ""
                      }
                    >
                      {commission.status.charAt(0).toUpperCase() + commission.status?.slice(1)}
                    </span>
                </div>
            ))}
        </div>
    );
}
