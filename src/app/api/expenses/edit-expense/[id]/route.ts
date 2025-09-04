import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import Expense from "@/models/Expense";
import { getServerSession } from "next-auth";

export async function PUT(request: Request, { params }: { params: { id: string } }) {

    try {
        await connectDB();

        const session = getServerSession(authOptions)
        if (!session) {
            return new Response("Unauthorized", { status: 401 });
        }

        const expenseId = params.id;
        const data = await request.json();
        console.log(data, "data in edit route");

        const updatedExpense = await Expense.findOneAndUpdate(
            {
                _id: expenseId,
                userId: session.user?._id
            },
            data,
            { new: true }
        )
        if (!updatedExpense) {
            return new Response("Expense not found!", { status: 404 });
        }
        return new Response(
            JSON.stringify({
                success: 200,
                message: "Expense updated successfully",
                data: updatedExpense
            })
        )

    } catch (error) {
        console.error("Error updating expense:", error);
        return new Response("Internal Server Error", { status: 500 });
    }
}