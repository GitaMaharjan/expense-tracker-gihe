// components/ExpensePieChart.tsx
"use client";

import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

interface Expense {
  id: string;
  amount: number;
  category: string;
  description: string;
  date: string;
  type: "income" | "expense";
}

interface Props {
  expenses: Expense[];
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#FF4567", "#AA00FF"];

export default function ExpensePieChart({ expenses }: Props) {
  // Transform data for Pie chart
  const categoryData = Object.entries(
    expenses
      .filter(e => e.type === "expense")
      .reduce((acc, e) => {
        acc[e.category] = (acc[e.category] || 0) + e.amount;
        return acc;
      }, {} as Record<string, number>)
  ).map(([name, value]) => ({ name, value }));

  return (
    <div className="p-4 bg-white rounded shadow">
      <h3 className="text-lg font-bold mb-2">Expenses by Category</h3>
      <PieChart width={400} height={300}>
        <Pie
          data={categoryData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={100}
          label
        >
          {categoryData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
}
