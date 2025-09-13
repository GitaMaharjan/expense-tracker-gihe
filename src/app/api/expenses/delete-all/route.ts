// pages/api/expenses/delete-all.ts
import { connectDB } from "@/lib/mongodb";
import Expense from "@/models/Expense";

export async function DELETE() {
    await connectDB();
    try {
        await Expense.deleteMany({});
        return new Response(
            JSON.stringify({ success: true, message: "All expenses deleted" }),
            { status: 200 }
        );
    } catch (error) {
        console.error(error);
        return new Response(
            JSON.stringify({ success: false, message: "Failed to delete expenses" }),
            { status: 500 }
        );
    }
}
