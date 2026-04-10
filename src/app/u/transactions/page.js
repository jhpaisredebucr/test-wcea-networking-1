'use client';

import { useEffect, useState } from "react";
import Transactions from "@/app/u/components/member/Transactions";

export default function Page() {
  const [transactions, setData] = useState([]);

  useEffect(() => {
    fetch("/api/transaction")
      .then(res => res.json())
      .then(d => setData(d.transactions));
  }, []);

  return (
    <>
      <h1 className="text-3xl font-semibold mb-6">Transactions</h1>
      <Transactions transactions={transactions} />
    </>
  );
}