"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { DollarSign, TrendingUp, TrendingDown } from "lucide-react";
import React, { useEffect, useState } from "react";

interface Transaction {
  type: string;
  amount: number;
}

export default function Page() {
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState<any[]>([]);

  const balance = totalIncome - totalExpenses;

  useEffect(() => {
    const getTransactions = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/expenses/get-expenses");
        const transactionData = await response.json();

        if (!transactionData.success) {
          throw new Error("Failed to fetch expenses");
        }
        const fetchedTransactions = transactionData.data;
        setTransactions(fetchedTransactions);
        const income = fetchedTransactions
          .filter((transaction: Transaction) => transaction.type === "income")
          .reduce(
            (runningTotal: number, transaction: Transaction) =>
              runningTotal + transaction.amount,
            0
          );
        console.log(income);
        const expense = fetchedTransactions
          .filter((transaction: Transaction) => transaction.type === "expense")
          .reduce(
            (runningTotal: number, transaction: Transaction) =>
              runningTotal + transaction.amount,
            0
          );
        setTotalIncome(income);
        setTotalExpenses(expense);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching transactions:", err);
      } finally {
        setLoading(false);
      }
    };
    getTransactions();
  }, []);
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Income</p>
                <p className="text-2xl font-bold text-emerald-600">
                  ${totalIncome.toFixed(2)}
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-emerald-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Expenses</p>
                <p className="text-2xl font-bold text-red-600">
                  ${totalExpenses.toFixed(2)}
                </p>
              </div>
              <TrendingDown className="w-8 h-8 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Net Balance</p>
                <p
                  className={`text-2xl font-bold ${
                    balance >= 0 ? "text-emerald-600" : "text-red-600"
                  }`}
                >
                  ${balance.toFixed(2)}
                </p>
              </div>
              <DollarSign className="w-8 h-8 text-gray-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {transactions.slice(0, 5).map((transactions) => (
              <div
                key={transactions.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      transactions.type === "income"
                        ? "bg-emerald-100"
                        : "bg-red-100"
                    }`}
                  >
                    {transactions.type === "income" ? (
                      <TrendingUp className="w-5 h-5 text-emerald-600" />
                    ) : (
                      <TrendingDown className="w-5 h-5 text-red-600" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      {transactions.description}
                    </p>
                    <p className="text-sm text-gray-500">
                      {transactions.category} • {transactions.date}
                    </p>
                  </div>
                </div>
                <div
                  className={`font-bold ${
                    transactions.type === "income"
                      ? "text-emerald-600"
                      : "text-red-600"
                  }`}
                >
                  {transactions.type === "income" ? "+" : "-"}$
                  {transactions.amount.toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
