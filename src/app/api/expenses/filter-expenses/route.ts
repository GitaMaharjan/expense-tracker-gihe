import { connectDB } from "@/lib/mongodb";
import Expense from "@/models/Expense";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
        await connectDB();
        const { searchParams } = new URL(request.url);
        const category = searchParams.get("category") || "";
        const type = searchParams.get("type") || "";

        const query: { category?: string, type?: string } = {};

        if (category) {
            query.category = category;
        }
        if (type) {
            query.type = type.toLowerCase();
        }

        const expenses = await Expense.find(query).sort({ date: -1 });

        return NextResponse.json({ success: true, data: expenses });



    } catch (error) {
        console.error(error);

        return NextResponse.json(
            { success: false, message: "Server Error" },
            { status: 500 }
        );

    }


}