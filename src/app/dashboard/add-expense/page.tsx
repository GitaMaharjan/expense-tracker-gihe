"use client";

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
import { toast } from "sonner";
import React from "react";

export default function Page() {
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmitExpense = async (e: React.FormEvent) => {
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
    console.log(data);
    try {
      const res = await fetch("/api/expenses/add-expenses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        toast.success("Transaction added successfully!");
        (e.target as HTMLFormElement).reset();
        setIsLoading(false);
      } else {
        const error = await res.json();
        toast.error(error.errors);
        setIsLoading(false);
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmitExpense} className="max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>Add New Transaction</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="type">Type</Label>
              <Select
                name="type"
                // value={newExpense.type}
                // onValueChange={(value: "income" | "expense") => setNewExpense({ ...newExpense, type: value })}
              >
                <SelectTrigger>
                  <SelectValue />
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
                placeholder="0.00"
                // value={newExpense.amount}
                // onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="category">Category</Label>
              <Select
                name="category"
                // value={newExpense.category}
                // onValueChange={(value) => setNewExpense({ ...newExpense, category: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Food">Food</SelectItem>
                  <SelectItem value="Transport">Transport</SelectItem>
                  <SelectItem value="Entertainment">Entertainment</SelectItem>
                  <SelectItem value="Shopping">Shopping</SelectItem>
                  <SelectItem value="Bills">Bills</SelectItem>
                  <SelectItem value="Healthcare">Healthcare</SelectItem>
                  <SelectItem value="Salary">Salary</SelectItem>
                  <SelectItem value="Freelance">Freelance</SelectItem>
                  <SelectItem value="Investment">Investment</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="date">Date</Label>
              <Input
                name="date"
                id="date"
                type="date"
                // value={newExpense.date}
                // onChange={(e) => setNewExpense({ ...newExpense, date: e.target.value })}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              name="description"
              id="description"
              placeholder="Enter description..."
              // value={newExpense.description}
              // onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
            />
          </div>

          <Button
            isLoading={isLoading}
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-700"
          >
            <PlusCircle className="w-4 h-4 mr-2" />
            Add Transaction
          </Button>
        </CardContent>
      </Card>
    </form>
  );
}
