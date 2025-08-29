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
import { useEffect } from "react";

export default async function Page() {
  const response = await fetch(
    process.env.NEXT_PUBLIC_BASE_URI + "/api/expenses/get-expenses",
    {
      method: "GET",
    }
  );
  const result = await response.json();
  const expenses = result.expenses;
  console.log(result);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>All Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {expenses.map((expense: any) => (
              <div
                key={expense.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      expense.type === "income"
                        ? "bg-emerald-100"
                        : "bg-red-100"
                    }`}
                  >
                    {expense.type === "income" ? (
                      <TrendingUp className="w-6 h-6 text-emerald-600" />
                    ) : (
                      <TrendingDown className="w-6 h-6 text-red-600" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      {expense.description}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="secondary">{expense.category}</Badge>
                      <span className="text-sm text-gray-500">
                        {expense.date}
                      </span>
                    </div>
                  </div>
                </div>
                <div
                  className={`text-xl font-bold ${
                    expense.type === "income"
                      ? "text-emerald-600"
                      : "text-red-600"
                  }`}
                >
                  {expense.type === "income" ? "+" : "-"}$
                  {expense.amount.toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
