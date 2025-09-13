import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import Expense from "@/models/Expense";
import { getServerSession } from "next-auth/next";

export async function POST(request: Request, { params }: { params: { id: string } }) {

    try {
        await connectDB();

        const session = await getServerSession(authOptions)
        if (!session) {
            return new Response("Unauthorized", { status: 401 });
        }

        const expenseId = params.id;
        const data = await request.json();
        console.log(data, "data in edit route");

        const updatedExpense = await Expense.findOneAndUpdate(
            {
                _id: expenseId,
                userId: session.user?.id
            },
            data,
            { new: true }
        )
        console.log(updatedExpense, "updated expense");
        console.log(params.id, "params id");
        console.log(session.user?.id, "session user id");
        if (!updatedExpense) {
            return new Response("Expense not found!", { status: 404 });
        }
        return new Response(
            JSON.stringify({ message: "Expense updated successfully", data: updatedExpense }),
            { status: 200, headers: { "Content-Type": "application/json" } }
        );


    } catch (error) {
        console.error("Error updating expense:", error);
        return new Response("Internal Server Error", { status: 500 });
    }
}