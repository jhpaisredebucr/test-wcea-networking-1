'use client';

import { useEffect, useState } from "react";
import Transactions from "@/app/components/ui/member/Transactions";



export default function Page() {
  const [transactions, setTransactions] = useState([]);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);



  const fetchTransactions = async () => {
    try {
      // TRANSACTION
      const resTx = await fetch("/api/transaction");
      const txData = await resTx.json();
      setTransactions(txData.transactions || []);

      // USER DATA
      const resUser = await fetch("/api/users");
      const userDataRes = await resUser.json();
      setUserData(userDataRes.success ? userDataRes : null);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

if (loading) {
  return (
    <div className="w-full flex">
      <div className="w-full ml-56 px-20 py-7 bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
          <div className="text-xl text-gray-700">Loading...</div>
        </div>
      </div>
    </div>
  );
}

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">
                    All Transactions
                </h2>
                <button 
                    onClick={fetchTransactions}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Refresh
                </button>
            </div>
            <Transactions transactions={transactions} userData={userData} onRefresh={fetchTransactions} />
        </div>
    )
}