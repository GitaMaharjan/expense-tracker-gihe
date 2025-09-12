import { connectDB } from "@/lib/mongodb";
import Expense from "@/models/Expense";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();
  try {

    const expenses = await Expense.find({});
    console.log(expenses);

    return NextResponse.json({ success: true, data: expenses }, { status: 200 });
  } catch (error) {
    console.error("Error fetching expenses:", error);
    return NextResponse.json({ success: false, message: "Failed to fetch expenses" }, { status: 500 });
  }
}