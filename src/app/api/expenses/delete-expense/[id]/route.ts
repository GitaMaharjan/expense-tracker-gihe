import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import Expense from "@/models/Expense";
import { Types } from "mongoose";
import { getServerSession } from "next-auth";

export async function DELETE(
    request: Request,
    context: { params: Promise<{ id: string }> }
) {
    try {
        await connectDB();

        // Get session
        const session = await getServerSession(authOptions);
        console.log(session, "session in delete route");

        if (!session) {
            return new Response("Unauthorized", { status: 401 });
        }

        // ✅ Await params
        const { id: expenseId } = await context.params;
        console.log(expenseId, "expenseId");

        // ✅ Use session.user.id (not _id)
        const deletedExpense = await Expense.findOneAndDelete({
            _id: expenseId,
            userId: new Types.ObjectId(session.user.id), // 🔑 convert to ObjectId
        });

        console.log(deletedExpense, "deleted expense");
        console.log(session.user?.id, "session user id");

        if (!deletedExpense) {
            return new Response("Expense not found!", { status: 404 });
        }

        return new Response(
            JSON.stringify({
                success: 200,
                message: "Expense deleted successfully",
                data: deletedExpense,
            }),
            { status: 200 }
        );
    } catch (error) {
        console.error("Error deleting expense:", error);
        return new Response("Internal Server Error", { status: 500 });
    }
}


