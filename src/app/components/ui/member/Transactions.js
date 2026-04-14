import { format } from "date-fns";

export default function Transactions({transactions}) {

    return (
        <div>
            <div className="grid grid-cols-4 shadow-sm p-5 mt-5 rounded-lg bg-white font-semibold">
                <div>Date</div>
                <div>Type</div>
                <div>Amount</div>
                <div>Status</div>
            </div>

            {transactions.map((transaction, index) => (
                <div
                    key={index}
                    className="grid grid-cols-4 shadow-sm p-5 rounded-lg bg-white mt-2"
                >
                    <div>{format(new Date(transaction.created_at), "MMM dd, yyyy")}</div>
                    <div>{transaction.type.charAt(0).toUpperCase() + transaction.type?.slice(1)}</div>
                    <div>₱{transaction.amount}</div>
                    <div>{transaction.status}</div>
                </div>
            ))}
        </div>
    );
}