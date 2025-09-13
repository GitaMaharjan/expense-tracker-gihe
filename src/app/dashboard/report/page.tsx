"use client";

import { useEffect, useState } from "react";
import CategoryPieChart from "./CategoryPieChart";
import MonthlyTrendsChart from "./MonthlyTrendsChart";

interface Expense {
  _id: string; // if coming from MongoDB
  amount: number;
  category: string;
  description: string;
  date: string;
  type: "income" | "expense";
}

export default function ReportPage() {
  const [transactions, setTransactions] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getTransactions = async () => {
      try {
        const response = await fetch("/api/expenses/get-expenses");
        const transactionData = await response.json();

        if (!transactionData.success) {
          throw new Error(
            transactionData.message || "Failed to fetch expenses"
          );
        }

        setTransactions(transactionData.data);
      } catch (err) {
        console.error("Error fetching transactions:", err);
        setError(err.message || "Error fetching transactions");
      } finally {
        setLoading(false);
      }
    };

    getTransactions();
  }, []);

  if (loading) {
    return <p className="p-6 text-gray-500">Loading report...</p>;
  }

  if (error) {
    return <p className="p-6 text-red-500"> {error}</p>;
  }

  if (transactions.length === 0) {
    return <p className="p-6 text-gray-500">No transactions to display</p>;
  }

  return (
    <>
      <div className="flex gap-2">
        <div className="flex-1">
          <CategoryPieChart transactions={transactions} type="expense" />
        </div>
        <div className="flex-1">
          <CategoryPieChart transactions={transactions} type="income" />
        </div>
      </div>
      <div className="mt-6">
        <MonthlyTrendsChart transactions={transactions} />
      </div>
    </>
  );
}
