// components/MonthlyTrendsChart.tsx
"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

interface Transaction {
  _id: string;
  amount: number;
  category: string;
  description: string;
  date: string; // ISO string
  type: "income" | "expense";
}

interface Props {
  transactions: Transaction[];
}

export default function MonthlyTrendsChart({ transactions }: Props) {
  // Group transactions by month
  const monthlyData: Record<string, { income: number; expense: number }> = {};

  transactions.forEach((t) => {
    const month = new Date(t.date).toLocaleString("default", {
      month: "short",
      year: "numeric",
    });

    if (!monthlyData[month]) {
      monthlyData[month] = { income: 0, expense: 0 };
    }

    if (t.type === "income") {
      monthlyData[month].income += t.amount;
    } else {
      monthlyData[month].expense += t.amount;
    }
  });

  const chartData = Object.entries(monthlyData).map(([month, values]) => ({
    month,
    income: values.income,
    expense: values.expense,
  }));

  if (chartData.length === 0) {
    return <p className="p-4 text-gray-500">No monthly data to display</p>;
  }

  return (
    <div className="p-4 bg-white rounded shadow w-full h-80">
      <h3 className="text-lg font-bold mb-2">Monthly Income vs Expenses</h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip formatter={(value: number) => `$${value.toFixed(2)}`} />
          <Legend />
          <Line
            type="monotone"
            dataKey="income"
            stroke="#00C49F"
            strokeWidth={2}
          />
          <Line
            type="monotone"
            dataKey="expense"
            stroke="#FF4567"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
