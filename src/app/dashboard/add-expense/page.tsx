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
import { toast } from "sonner";
import React from "react";
import { PlusCircle, DollarSign, Calendar, Tag, Type } from "lucide-react";

const expenseCategories = [
  "Food",
  "Transport",
  "Entertainment",
  "Shopping",
  "Rent",
  "Health",
  "Other",
];

const incomeCategories = ["Salary", "Freelance", "Business", "Gift", "Other"];

export default function Page() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [type, setType] = React.useState<string | undefined>();

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

    try {
      const res = await fetch("/api/expenses/add-expenses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        toast.success("Transaction added successfully!");
        (e.target as HTMLFormElement).reset();
        setType(undefined);
      } else {
        const error = await res.json();
        toast.error(error.errors);
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-4 font-sans">
      <form onSubmit={handleSubmitExpense} className="w-full max-w-2xl">
        <Card className="shadow-2xl rounded-xl border border-gray-200">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-400 text-white rounded-t-xl p-6">
            <CardTitle className="text-2xl font-bold tracking-wide">
              Add New Transaction
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Type & Amount */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <Label className="flex items-center gap-3 text-gray-700 font-medium mb-1">
                  {/* <Type className="w-6 h-6 text-blue-500" /> */}
                  Type
                </Label>
                <Select
                  name="type"
                  value={type}
                  onValueChange={(value) => setType(value)}
                  className="rounded-lg shadow-sm border-gray-300 hover:border-blue-400 transition"
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="expense">Expense</SelectItem>
                    <SelectItem value="income">Income</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col">
                <Label className="flex items-center gap-3 text-gray-700 font-medium mb-1">
                  {/* <DollarSign className="w-6 h-6 text-green-500" /> */}
                  Amount
                </Label>
                <Input
                  id="amount"
                  name="amount"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  className="rounded-lg shadow-sm border-gray-300 hover:border-green-400 transition"
                />
              </div>
            </div>

            {/* Category & Date */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <Label className="flex items-center gap-3 text-gray-700 font-medium mb-1">
                  {/* <Tag className="w-6 h-6 text-purple-500" /> */}
                  Category
                </Label>
                <Select
                  name="category"
                  disabled={!type}
                  className="rounded-lg shadow-sm border-gray-300 hover:border-purple-400 transition"
                >
                  <SelectTrigger className="w-full">
                    <SelectValue
                      placeholder={
                        type ? "Select category" : "Select type first"
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {type &&
                      (type === "income"
                        ? incomeCategories
                        : expenseCategories
                      ).map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col">
                <Label className="flex items-center gap-3 text-gray-700 font-medium mb-1">
                  {/* <Calendar className="w-6 h-6 text-orange-500" /> */}
                  Date
                </Label>
                <Input
                  id="date"
                  name="date"
                  type="date"
                  className="rounded-lg shadow-sm border-gray-300 hover:border-orange-400 transition"
                />
              </div>
            </div>

            {/* Description */}
            <div className="flex flex-col">
              <Label className="flex items-center gap-3 text-gray-700 font-medium mb-1">
                {/* <PlusCircle className="w-6 h-6 text-pink-500" /> */}
                Description
              </Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Enter description..."
                className="rounded-lg shadow-sm border-gray-300 hover:border-pink-400 transition"
              />
            </div>

            {/* Submit */}
            <Button
              isLoading={isLoading}
              type="submit"
              className={`w-full flex items-center justify-center gap-3 text-white text-lg font-semibold py-3 rounded-lg shadow-md ${
                type === "income"
                  ? "bg-green-600 hover:bg-green-700"
                  : type === "expense"
                  ? "bg-red-600 hover:bg-red-700"
                  : "bg-emerald-600 hover:bg-emerald-700"
              } transition-colors`}
            >
              <PlusCircle className="w-6 h-6" />
              Add Transaction
            </Button>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}
