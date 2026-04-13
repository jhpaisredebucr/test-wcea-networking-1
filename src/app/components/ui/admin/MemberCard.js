export default function MemberCard({user, onClose}) {

    async function BanAccount(statusToAdd) {
        console.log(user?.id);
        const res = await fetch("/api/users/ban", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 
                userId: user?.id,
                statusToAdd: statusToAdd
            })
        });

        const data = await res.json();
        console.log(data);
    }

    //GOO JHOREMZ HAHAHAHA TINATAMAD AKO GUMAWA NG COMPONENT, STRING NALANG LIPAT MONA LANG HAHAHAHA
    const buttonClassBlue = "px-4 py-2 bg-(--primary) text-white rounded hover:bg-blue-400 transition"
    const buttonClassRed = "px-4 py-2 bg-red-400 text-white rounded hover:bg-blue-400 transition"
    
    
    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="flex flex-col bg-white p-6 gap-5 rounded-lg shadow-lg w-110">
                <p>{user?.first_name} {user?.last_name}</p>
                <div className="flex flex-col gap-2">
                    <button className={buttonClassBlue}>View Profile</button>
                    <button className={buttonClassBlue}>View Transactions</button>
                    <button className={buttonClassBlue}>View Orderes</button>
                    {user?.status === "approved" && (
                        <button className={buttonClassRed} onClick={() => BanAccount("banned")}>Ban Account</button>
                    )}

                    {user?.status === "banned" && (
                        <button className={buttonClassBlue} onClick={() => BanAccount("approved")}>Remove Ban</button>
                    )}
                </div>

                <button onClick={onClose} className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition">Close</button>

                
            </div>
        </div>
    )
}