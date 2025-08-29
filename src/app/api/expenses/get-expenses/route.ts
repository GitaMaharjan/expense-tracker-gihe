import { connectDB } from "@/lib/mongodb";
import Expense from "@/models/Expense";

export async function GET(){
    await connectDB();

    try {
    await connectDB();

    const expenses = await Expense.find({});
    console.log(expenses);

    return Response.json({ success: true, data: expenses }, { status: 200 });
  } catch (error) {
    console.error("Error fetching expenses:", error);
    return Response.json({ success: false, message: "Failed to fetch expenses" }, { status: 500 });
  }
}