"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  PlusCircle,
  Receipt,
  BarChart3,
  DollarSign,
  Tag,
  TrendingUp,
  TrendingDown,
  Wallet,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { Routes } from "@/lib/dashboard-route";
import * as Icons from "lucide-react";

interface Expense {
  id: string;
  amount: number;
  category: string;
  description: string;
  date: string;
  type: "income" | "expense";
}

export default function RootLayout({ children }: any) {
  const router = useRouter();

  const activeTab = usePathname();
  const currentRoute = Routes().find(
    (route) => route.path.trim() === activeTab.trim()
  );

  const [expenses, setExpenses] = useState<Expense[]>([
    {
      id: "1",
      amount: 1200,
      category: "Salary",
      description: "Monthly salary",
      date: "2024-01-15",
      type: "income",
    },
    {
      id: "2",
      amount: 85.5,
      category: "Food",
      description: "Grocery shopping",
      date: "2024-01-14",
      type: "expense",
    },
    {
      id: "3",
      amount: 45.0,
      category: "Transport",
      description: "Gas for car",
      date: "2024-01-13",
      type: "expense",
    },
  ]);

  const [newExpense, setNewExpense] = useState({
    amount: "",
    category: "",
    description: "",
    date: "",
    type: "expense" as "income" | "expense",
  });

  const handleAddExpense = () => {
    if (newExpense.amount && newExpense.category && newExpense.date) {
      const expense: Expense = {
        id: Date.now().toString(),
        amount: Number.parseFloat(newExpense.amount),
        category: newExpense.category,
        description: newExpense.description,
        date: newExpense.date,
        type: newExpense.type,
      };
      setExpenses([expense, ...expenses]);
      setNewExpense({
        amount: "",
        category: "",
        description: "",
        date: "",
        type: "expense",
      });
    }
  };

  const totalIncome = expenses
    .filter((e) => e.type === "income")
    .reduce((sum, e) => sum + e.amount, 0);

  const totalExpenses = expenses
    .filter((e) => e.type === "expense")
    .reduce((sum, e) => sum + e.amount, 0);

  const balance = totalIncome - totalExpenses;

  const categoryTotals = expenses
    .filter((e) => e.type === "expense")
    .reduce((acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
      return acc;
    }, {} as Record<string, number>);

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="w-64 sidebar-gradient border-r border-gray-200 flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center">
              <Wallet className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                ExpenseTracker
              </h1>
              <p className="text-sm text-gray-500">Financial Dashboard</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <div className="space-y-2">
            {Routes().map((route) => {
              const Icon: any = Icons[route.icon as keyof typeof Icons];
              return (
                <button
                  key={route.id}
                  onClick={() => router.push(route.path)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                    activeTab === route.id
                      ? "bg-emerald-100 text-emerald-700 border border-emerald-200"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{route.label}</span>
                </button>
              );
            })}
          </div>
        </nav>

        {/* Balance Summary */}
        <div className="p-4 border-t border-gray-200">
          <div className="expense-card p-4">
            <div className="text-sm text-gray-500 mb-1">Current Balance</div>
            <div
              className={`text-2xl font-bold ${
                balance >= 0 ? "text-emerald-600" : "text-red-600"
              }`}
            >
              ${balance.toFixed(2)}
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 capitalize">
                {currentRoute?.label}
              </h2>
              <p className="text-gray-500">
                {activeTab.includes("overview") &&
                  "Track your financial overview"}
                {activeTab.includes("add-expense") &&
                  "Add a new income or expense"}
                {activeTab.includes("all-expenses") &&
                  "View all your transactions"}
                {activeTab.includes("report") &&
                  "Analyze your spending patterns"}
              </p>
            </div>
            <div className="text-sm text-gray-500">
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
          </div>
        </header>
        {/* Content */}
        {children}
      </div>
    </div>
  );
}
