import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import Expense from "@/models/Expense";
import { getServerSession } from "next-auth";
import { RESPONSE_LIMIT_DEFAULT } from "next/dist/server/api-utils";

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    try {
        await connectDB();
        const session = await getServerSession(authOptions)
        console.log(session, "session in delete route");
        if (!session) {
            return new Response("Unauthorized", { status: 401 });
        }

        const expenseId = params.id;
        console.log(expenseId, "expenseId");

        // Here, you would typically perform the deletion operation in your database
        // Find and delete expense only if it belongs to logged-in user
        const deletedExpense = await Expense.findOneAndDelete({
            _id: expenseId,
            userId: session.user?._id, // ensures users can only delete their own expense
        });

        if (!deletedExpense) {
            return new Response("Expense not found!", { status: 404 });
        }

        return new Response(
            JSON.stringify({
                success: 200,
                message: "Expense dleted successfully",
                data: deletedExpense
            })
        )
    } catch (error) {
        console.error("Error deleting expense:", error);
        return new Response("Internal Server Error", { status: 500 });
    }
}