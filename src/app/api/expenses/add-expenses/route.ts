import { connectDB } from "@/lib/mongodb";
import { expenseSchema } from "@/lib/validation";
import Expense from '@/models/Expense';
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { Types } from "mongoose";

export async function POST(request: Request) {
    const data = await request.json();
    // console.log(data, "gitanda");

    await connectDB();

    const session = await getServerSession(authOptions);
    if (!session) {
        return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    console.log(session, "session");
    data.userId = session.user.id;

    // data.userId = new Types.ObjectId(session.user.id);
    console.log(data.userId, "id");

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


// // app/api/expenses/add-expense/route.ts
// import { connectDB } from "@/lib/mongodb";
// import Expense from "@/models/Expense";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/auth";
// import { expenseSchema } from "@/lib/validation";
// import { Types } from "mongoose";

// export async function POST(request: Request) {
//     try {
//         await connectDB();

//         const session = await getServerSession(authOptions);
//         if (!session) {
//             return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
//         }

//         const data = await request.json();

//         // Assign userId from session as ObjectId
//         data.userId = new Types.ObjectId(session.user.id);

//         // Validate input
//         const parsed = expenseSchema.safeParse(data);
//         if (!parsed.success) {
//             const firstError =
//                 Object.values(parsed.error.flatten().fieldErrors)
//                     .flatMap((e) => e || [])[0] || "Invalid input";
//             return new Response(JSON.stringify({ errors: firstError }), { status: 400 });
//         }

//         const newExpense = await Expense.create(parsed.data);

//         return new Response(JSON.stringify({ success: true, data: newExpense }), { status: 201 });
//     } catch (error) {
//         console.error("Error creating expense:", error);
//         return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
//     }
// }
