'use client';

import { useEffect, useState, useCallback } from "react";
import Transactions from "@/app/components/ui/member/Transactions";

export default function Page() {
  const [transactions, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  const loadData = useCallback(async () => {
    setRefreshing(true);
    try {
      const res = await fetch("/api/transaction");
      const d = await res.json();
      setData(d.transactions || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  const downloadPDF = useCallback((txns, from, to) => {
    const { jsPDF } = require('jspdf');
    const doc = new jsPDF();
    
    // Filter
    const filtered = txns.filter(t => {
      const date = new Date(t.created_at);
      const f = from ? new Date(from) : new Date(0);
      const tt = to ? new Date(to) : new Date();
      return date >= f && date <= tt;
    });

    // Header
    doc.setFontSize(20);
    doc.text('Transaction History', 20, 20);
    doc.setFontSize(12);
    doc.text(`Period: ${from || 'All time'} to ${to || 'All time'}`, 20, 35);
    doc.text(`${filtered.length} transactions`, 20, 45);

    // Table with lines
    let y = 60;
    const tableHeaders = ['Date', 'Type', 'Amount', 'Method', 'Status'];
    const colWidths = [30, 30, 30, 30, 40];
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

    doc.save('transactions.pdf');
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

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
    <div className="py-7">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold">Transactions</h1>
        <div className="flex gap-2">
          <button 
            onClick={loadData}
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
      <Transactions transactions={transactions} onRefresh={loadData} />
    </div>
  );
}