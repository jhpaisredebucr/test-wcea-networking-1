'use client';

import { useEffect, useState } from "react";
import Transactions from "@/app/components/member/Transactions";



export default function Page() {
  const [transactions, setTransactions] = useState([]);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');



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

  const downloadPDF = (txns, from, to) => {
    const { jsPDF } = require('jspdf');
    const doc = new jsPDF();
    
    const filtered = txns.filter(t => {
      const date = new Date(t.created_at);
      const f = from ? new Date(from) : new Date(0);
      const tt = to ? new Date(to) : new Date();
      return date >= f && date <= tt;
    });

    doc.setFontSize(20);
    doc.text('Admin Transaction History', 20, 20);
    doc.setFontSize(12);
    doc.text(`Period: ${from || 'All time'} to ${to || 'All time'}`, 20, 35);
    doc.text(`${filtered.length} transactions`, 20, 45);

    // Table with lines
    const tableHeaders = ['Date', 'Type', 'Amount', 'Method', 'Status'];
    const colX = [20, 50, 80, 110, 140];
    
    // Header line
    doc.setFontSize(11);
    doc.setFont(undefined, 'bold');
    tableHeaders.forEach((header, i) => {
      doc.text(header, colX[i], y);
    });
    doc.setFont(undefined, 'normal');
    doc.setLineWidth(0.5);
    doc.line(20, y+2, 190, y+2);
    y += 8;

    filtered.forEach(t => {
      if (y > 280) {
        doc.addPage();
        y = 20;
      }
      doc.setFontSize(9);
      doc.text(new Date(t.created_at).toLocaleDateString(), colX[0], y);
      doc.text(t.type || 'N/A', colX[1], y);
      doc.text(`₱${t.amount || 0}`, colX[2], y);
      doc.text(t.payment_method || 'N/A', colX[3], y);
      doc.text(t.status || 'unknown', colX[4], y);
      
      // Row lines
      doc.setLineWidth(0.2);
      doc.line(20, y+2, 190, y+2);
      y += 6;
    });

    doc.save('admin-transactions.pdf');
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
                <div className="flex gap-2">
                  <button 
                    onClick={fetchTransactions}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Refresh
                  </button>

                  <input type="date" className="px-2 py-1 border rounded" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
                  <input type="date" className="px-2 py-1 border rounded" value={toDate} onChange={(e) => setToDate(e.target.value)} />
                  <button 
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                    onClick={() => downloadPDF(transactions, fromDate, toDate)}
                  >
                    Download PDF
                  </button>
                </div>
            </div>
            <Transactions transactions={transactions} userData={userData} onRefresh={fetchTransactions} />
        </div>
    )
}