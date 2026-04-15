import { format } from "date-fns";

export default function Transactions({transactions}) {

    async function Approve(transactionId) {
        const resApprove  = await fetch("/api/transaction/approve", {
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({transactionId})
        });

        const dataApprove  = await resApprove.json();
        console.log(dataApprove);
    }

    return (
        <div>
            <div className="grid grid-cols-5 shadow-sm p-5 mt-5 rounded-lg bg-white font-semibold">
                <div>Date</div>
                <div>Type</div>
                <div>Amount</div>
                <div>Payment Method</div>
                <div>Status</div>
            </div>

            {transactions.map((transaction, index) => (
                <div
                    key={index}
                    className="grid grid-cols-5 shadow-sm p-5 rounded-lg bg-white mt-2"
                >
                    <div>{format(new Date(transaction.created_at), "MMM dd, yyyy")}</div>
                    <div>{transaction.type.charAt(0).toUpperCase() + transaction.type?.slice(1)}</div>
                    <div>₱{transaction.amount}</div>
                    <div>{transaction.payment_method}</div>
                    <div className="flex items-center justify-between">
                        <span
                            className={
                                transaction.status === "approved"
                                ? "text-green-600"
                                : transaction.status === "pending"
                                ? "text-yellow-500"
                                : transaction.status === "declined"
                                ? "text-red-600"
                                : ""
                            }
                            >
                            {transaction.status}
                        </span>
                        {transaction.status === "pending" &&
                        <button onClick={() => 
                            Approve(transaction.id)} 
                            className="p-1 rounded-sm hover:bg-(--primary)/80 bg-(--primary) cursor-pointer text-white text-sm">
                            Approve
                        </button>}
                    </div>
                </div>
            ))}
        </div>
    );
}