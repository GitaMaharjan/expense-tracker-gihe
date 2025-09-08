"use client";
import React, { useState, useEffect } from "react";

export interface Filters {
  category?: string;
  type?: string;
  sort?: string;
}

interface ExpenseControlProps {
  onFilterChange: (filters: Filters) => void;
}
export const ExpenseControl: React.FC<ExpenseControlProps> = ({
  onFilterChange,
}) => {
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");
  const [sort, setSort] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      onFilterChange({ category, type, sort });
    }, 300); // Debounce by 300ms
    return () => clearTimeout(timer);
  }, [category, type, sort, onFilterChange]);

  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-2">
        <select
          className="border text-sm px-2 py-1 rounded"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="Food">Food</option>
          <option value="Transport">Transport</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Shopping">Shopping</option>
          <option value="Rent">Rent</option>
          <option value="Health">Health</option>
          <option value="Other">Other</option>
        </select>

        <select
          className="border text-sm px-2 py-1 rounded"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="">All Types</option>
          <option value="Income">Income</option>
          <option value="Expense">Expense</option>
        </select>
      </div>

      <div className="flex gap-2">
        {/* Sort Dropdown */}
        <select
          className="border text-sm px-2 py-1 rounded"
          value={sort}
          onChange={(expense) => setSort(expense.target.value)}
        >
          <option value="">Sort By</option>
          <option value="amount-asc">Amount (Low → High)</option>
          <option value="amount-desc">Amount (High → Low)</option>
          <option value="date-asc">Date (Oldest First)</option>
          <option value="date-desc">Date (Newest First)</option>
        </select>
      </div>
    </div>
  );
};
