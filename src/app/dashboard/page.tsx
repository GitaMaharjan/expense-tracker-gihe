import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { PlusCircle, Receipt, BarChart3, DollarSign, Tag, TrendingUp, TrendingDown, Wallet } from "lucide-react"


export default function Page(){
    return <div className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500">Total Income</p>
                        {/* <p className="text-2xl font-bold text-emerald-600">${totalIncome.toFixed(2)}</p> */}
                      </div>
                      <TrendingUp className="w-8 h-8 text-emerald-500" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500">Total Expenses</p>
                        {/* <p className="text-2xl font-bold text-red-600">${totalExpenses.toFixed(2)}</p> */}
                      </div>
                      <TrendingDown className="w-8 h-8 text-red-500" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500">Net Balance</p>
                        {/* <p className={`text-2xl font-bold ${balance >= 0 ? "text-emerald-600" : "text-red-600"}`}>
                          ${balance.toFixed(2)}
                        </p> */}
                      </div>
                      <DollarSign className="w-8 h-8 text-gray-500" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Transactions */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Transactions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* {expenses.slice(0, 5).map((expense) => (
                      <div key={expense.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center ${
                              expense.type === "income" ? "bg-emerald-100" : "bg-red-100"
                            }`}
                          >
                            {expense.type === "income" ? (
                              <TrendingUp className="w-5 h-5 text-emerald-600" />
                            ) : (
                              <TrendingDown className="w-5 h-5 text-red-600" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{expense.description}</p>
                            <p className="text-sm text-gray-500">
                              {expense.category} • {expense.date}
                            </p>
                          </div>
                        </div>
                        <div className={`font-bold ${expense.type === "income" ? "text-emerald-600" : "text-red-600"}`}>
                          {expense.type === "income" ? "+" : "-"}${expense.amount.toFixed(2)}
                        </div>
                      </div>
                    ))} */}
                  </div>
                </CardContent>
              </Card>
            </div>
          
}