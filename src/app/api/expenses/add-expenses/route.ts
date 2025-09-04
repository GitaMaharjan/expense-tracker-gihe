import { connectDB } from "@/lib/mongodb";
import { connect } from "http2";
import { expenseSchema } from "@/lib/validation";
import Expense from '@/models/Expense';
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export async function POST(request: Request) {
    const data = await request.json();
    // console.log(data, "gitanda");

    await connectDB();

    const session = await getServerSession(authOptions);
    if (!session) {
        return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    console.log(session, "session");
    data.userId = session?.user?._id as any;
    // console.log(data.userId, "id");

    const parsed = expenseSchema.safeParse(data);
    if (!parsed.success) {
        console.error("Validation errors:", parsed.error.flatten().fieldErrors);
        const firstError = Object.values(parsed.error.flatten().fieldErrors).flatMap(e => e || [])[0] || "Invalid input";
        console.log(firstError, "first error");
        return Response.json(
            { errors: firstError },
            { status: 400 }
        );

    }
    try {
        const result = await Expense.create(parsed.data);
        return Response.json({ success: true, data: result }, { status: 201 });
    } catch (error) {
        console.error("Error saving expense:", error);
    }

}