import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { PlusCircle, Receipt, BarChart3, DollarSign, Tag, TrendingUp, TrendingDown, Wallet } from "lucide-react"

export default function Page(){
     <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Expense by Category</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {Object.entries(categoryTotals).map(([category, amount]) => (
                        <div key={category} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Tag className="w-4 h-4 text-gray-500" />
                            <span className="text-gray-700">{category}</span>
                          </div>
                          <span className="font-medium text-red-600">${amount.toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Monthly Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Total Income</span>
                        <span className="font-bold text-emerald-600">${totalIncome.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Total Expenses</span>
                        <span className="font-bold text-red-600">${totalExpenses.toFixed(2)}</span>
                      </div>
                      <div className="border-t pt-4">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-900 font-medium">Net Balance</span>
                          <span className={`font-bold text-lg ${balance >= 0 ? "text-emerald-600" : "text-red-600"}`}>
                            ${balance.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Spending Insights</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{expenses.length}</div>
                      <div className="text-sm text-blue-700">Total Transactions</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">
                        $
                        {expenses.length > 0
                          ? (totalExpenses / expenses.filter((e) => e.type === "expense").length).toFixed(2)
                          : "0.00"}
                      </div>
                      <div className="text-sm text-green-700">Avg. Expense</div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">{Object.keys(categoryTotals).length}</div>
                      <div className="text-sm text-purple-700">Categories Used</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
}