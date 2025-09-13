"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Trash2 } from "lucide-react";
import EditExpenseModal from "../edit-expense/page";
import { useRouter } from "next/navigation";
import ConfirmModal from "@/components/ui/confirm-modal/ConfirmModal";
import { toast } from "sonner";

export interface Expense {
  _id: string;
  description: string;
  category: string;
  type: string;
  amount: number;
  date: Date;
}

interface ExpenseListProps {
  filters: { category?: string; type?: string; sort?: string };
}

export default function ExpenseList({ filters }: ExpenseListProps) {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const router = useRouter();

  // Fetch expenses whenever filters change
  useEffect(() => {
    const fetchExpenses = async () => {
      setLoading(true);

      // Build query params from filters
      const params = new URLSearchParams();
      if (filters.category) params.append("category", filters.category);
      if (filters.type) params.append("type", filters.type);
      if (filters.sort) params.append("sort", filters.sort);

      try {
        const res = await fetch(
          `/api/expenses/filter-expenses?${params.toString()}`,
          {
            credentials: "include",
          }
        );

        if (!res.ok) throw new Error("Failed to fetch expenses");

        const data = await res.json();
        if (data.success) setExpenses(data.data);
        else setExpenses([]);
        router.replace(`/dashboard/view-expenses?${params.toString()}`);
      } catch (error) {
        console.error(error);
        setExpenses([]);
      } finally {
        setLoading(false);
      }
    };

    fetchExpenses();
  }, [filters]);

  const deleteExpense = async (id: string) => {
    try {
      const res = await fetch(`/api/expenses/delete-expense/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (res.ok) {
        setExpenses((prev) => prev.filter((e) => e._id !== id));
      } else {
        console.error(await res.text());
      }
    } catch (error) {
      console.error(error);
    }
  };
  const deleteAllExpenses = async () => {
    try {
      const res = await fetch("/api/expenses/delete-all", {
        method: "DELETE",
        credentials: "include",
      });

      const data = await res.json();
      if (data.success) {
        setExpenses([]);
        setIsModalOpen(false);
        toast.success("All expenses deleted successfully");
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <p>Loading expenses...</p>;
  if (expenses.length === 0) return <p>No expenses found.</p>;

  return (
    <div className="space-y-4">
      {expenses.map((expense) => (
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
                <span className="text-sm text-gray-500">
                  {/* {new Date(expense.createdAt).toLocaleDateString()} */}
                  {new Date(expense.date).toLocaleDateString()}
                </span>
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
            <EditExpenseModal
              expense={expense}
              onUpdated={(updated: any) =>
                setExpenses((prev) =>
                  prev.map((expense) =>
                    expense._id === updated._id ? updated : expense
                  )
                )
              }
            />
          </div>
        </div>
      ))}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          <Trash2 className="w-5 h-5" />
          Delete All
        </button>
      </div>
      <ConfirmModal
        isOpen={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onConfirm={deleteAllExpenses}
        title="Delete All Expenses"
        message="Are you sure you want to delete all expenses? This action cannot be undone."
      />
    </div>
  );
}
