import { connectDB } from "@/lib/mongodb";
import Expense from "@/models/Expense";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
        await connectDB();
        const { searchParams } = new URL(request.url);
        const category = searchParams.get("category") || "";
        const type = searchParams.get("type") || "";
        const sort = searchParams.get("sort") || "";

        const query: { category?: string, type?: string } = {};

        if (category) {
            query.category = category;
        }
        if (type) {
            query.type = type.toLowerCase();
        }

        let sortOption: Record<string, 1 | -1> = { date: -1 };
        if (sort == "amount-asc") {
            sortOption = { amount: 1 };
        }
        if (sort == "amount-desc") {
            sortOption = { amount: -1 };
        }
        if (sort == "date-asc") {
            sortOption = { date: 1 };
        }
        if (sort == "date-desc") {
            sortOption = { date: -1 };
        }

        const expenses = await Expense.find(query).sort(sortOption);

        return NextResponse.json({ success: true, data: expenses });



    } catch (error) {
        console.error(error);

        return NextResponse.json(
            { success: false, message: "Server Error" },
            { status: 500 }
        );

    }


}