import { format } from "date-fns";

export default function Commissions({commissions}) {

    return (
        <div>
            <div className="grid grid-cols-4 shadow-sm p-5 mt-5 rounded-lg bg-white font-semibold">
                <div>Date</div>
                <div>Name</div>
                <div>Amount</div>
                <div>Status</div>
            </div>

            {commissions.map((commission, index) => (
                <div
                    key={index}
                    className="grid grid-cols-4 shadow-sm p-5 rounded-lg bg-white mt-2"
                >
                    <div>{format(new Date(commission.created_at), "MMM dd, yyyy")}</div>
                    <div>{commission.referred_first_name} {commission.referred_last_name}</div>
                    <div>₱{commission.reward_amount	}</div>
                    <div>{commission.status}</div>
                </div>
            ))}
        </div>
    );
}