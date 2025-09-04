"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Trash2, Edit } from "lucide-react";

export default function ExpenseList({ initialExpenses }: any) {
  const [expenses, setExpenses] = useState(initialExpenses?.data || []);

  const deleteExpense = async (id: string) => {
    try {
      const res = await fetch(`/api/expenses/delete-expense/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setExpenses(expenses.filter((e: any) => e._id !== id));
      } else {
        console.error(await res.text());
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="space-y-4">
      {expenses.map((expense: any) => (
        <div
          key={expense._id}
          className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
        >
          <div className="flex items-center gap-4">
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center ${
                expense.type === "income" ? "bg-emerald-100" : "bg-red-100"
              }`}
            >
              {expense.type === "income" ? (
                <TrendingUp className="w-6 h-6 text-emerald-600" />
              ) : (
                <TrendingDown className="w-6 h-6 text-red-600" />
              )}
            </div>
            <div>
              <p className="font-medium text-gray-900">{expense.description}</p>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="secondary">{expense.category}</Badge>
                <span className="text-sm text-gray-500">{expense.date}</span>
              </div>
            </div>
          </div>
          <div
            className={`text-xl font-bold ${
              expense.type === "income" ? "text-emerald-600" : "text-red-600"
            }`}
          >
            {expense.type === "income" ? "+" : "-"}${expense.amount.toFixed(2)}
          </div>
          <div className="flex gap-2 mt-2">
            <button
              onClick={() => deleteExpense(expense._id)}
              className="p-1 rounded hover:bg-gray-200"
            >
              <Trash2 className="w-5 h-5 text-red-600" />
            </button>
            <button className="p-1 rounded hover:bg-gray-200">
              <Edit className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
