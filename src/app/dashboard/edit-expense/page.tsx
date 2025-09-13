"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
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
import { Edit } from "lucide-react";
import { toast } from "sonner";

export default function EditExpenseModal({ expense, onUpdated }: any) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [type, setType] = React.useState<string | undefined>(expense.type);

  const handleEditExpense = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.target as HTMLFormElement);
    const data = {
      type: formData.get("type"),
      amount: parseFloat(formData.get("amount") as string),
      category: formData.get("category"),
      description: formData.get("description"),
      date: formData.get("date"),
    };

    try {
      const res = await fetch(`/api/expenses/edit-expense/${expense._id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        const result = await res.json();
        toast.success("Expense updated successfully!");
        onUpdated(result.data);
        setOpen(false);
      } else {
        const error = await res.json();
        toast.error(error.message || "Failed to update expense");
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="icon" variant="outline">
          <Edit className="w-4 h-4" />
        </Button>
      </DialogTrigger>

      <DialogContent className="min-w-[400px] sm:min-w-[500px] shadow-lg rounded-xl border border-gray-200 p-0">
        <form onSubmit={handleEditExpense} className="space-y-0">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-400 text-white rounded-t-xl p-4">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold">
                Edit Expense
              </DialogTitle>
            </DialogHeader>
          </div>

          {/* Body */}
          <div className="p-4 space-y-4">
            {/* Type & Amount */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="type">Type</Label>
                <Select name="type" value={type} onValueChange={setType}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="expense">Expense</SelectItem>
                    <SelectItem value="income">Income</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="amount">Amount</Label>
                <Input
                  id="amount"
                  name="amount"
                  type="number"
                  step="0.01"
                  defaultValue={expense.amount}
                />
              </div>
            </div>

            {/* Category & Date */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="category">Category</Label>
                <Select name="category" defaultValue={expense.category}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {[
                      "Food",
                      "Transport",
                      "Entertainment",
                      "Shopping",
                      "Rent",
                      "Health",
                      "Other",
                    ].map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  name="date"
                  type="date"
                  defaultValue={expense.date?.slice(0, 10)}
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                defaultValue={expense.description}
                placeholder="Enter description..."
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              isLoading={isLoading}
              className={`w-full flex items-center justify-center gap-2 ${
                type === "income"
                  ? "bg-green-600 hover:bg-green-700"
                  : type === "expense"
                  ? "bg-red-600 hover:bg-red-700"
                  : "bg-emerald-600 hover:bg-emerald-700"
              } transition-colors`}
            >
              <Edit className="w-4 h-4" />{" "}
              {isLoading ? "Updating..." : "Update Expense"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
