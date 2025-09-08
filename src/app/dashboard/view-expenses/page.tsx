// "use client";
// import { useEffect, useState } from "react";

// import { ExpenseControl, Filters } from "./ExpenseControl";
// import ExpenseList from "./ExpenseList";

// export interface Expense {
//   _id: string;
//   description: string;
//   category: string;
//   type: string;
//   amount: number;
//   createdAt: string;
// }

// export default function Page() {
//   const [filters, setFilters] = useState<Filters>({});
//   const [expenses, setExpenses] = useState<Expense[]>([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     try {
//       const fetchExpenses = async () => {
//         setLoading(true);
//         const params = new URLSearchParams(filters as Record<string, string>);
//         console.log(params, "hi", "PARAMS");
//         const res = await fetch(
//           `/api/expenses/filter-expenses?${params.toString()}`,
//           {
//             credentials: "include",
//           }
//         );
//         const data = await res.json();
//         if (data.success) setExpenses(data.data);
//         setLoading(false);
//       };
//       fetchExpenses();
//     } catch (err) {
//       console.error(err);
//       setExpenses([]);
//     } finally {
//       setLoading(false);
//     }
//   }, [filters]);

//   return (
//     <div className="space-y-6">
//       <ExpenseControl onFilterChange={setFilters} />
//       {loading ? <p>Loading...</p> : <ExpenseList initialExpenses={expenses} />}
//     </div>
//   );
// }

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
