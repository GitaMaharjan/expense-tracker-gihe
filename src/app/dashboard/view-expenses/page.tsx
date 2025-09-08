"use client";

import { useState } from "react";
import { ExpenseControl, Filters } from "./ExpenseControl";
import ExpenseList, { Expense } from "./ExpenseList";

export default function ExpensesPage() {
  const [filters, setFilters] = useState<Filters>({});

  return (
    <div className="space-y-6 p-4">
      {/* Filters Component */}
      <ExpenseControl onFilterChange={setFilters} />

      {/* Expense List updates automatically based on filters */}
      <ExpenseList filters={filters} />
    </div>
  );
}
