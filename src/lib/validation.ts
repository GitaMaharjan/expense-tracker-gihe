import { z } from "zod";

const expenseSchema = z.object({
    type: z.enum(["income", "expense"], {
        errorMap: () => ({ message: "Type must be either 'income' or 'expense'" })
    }),
    amount: z.coerce.number({
        required_error: "Amount is required",
        invalid_type_error: "Amount must be a number"
    })
        .positive("Amount must be greater than 0")
        .max(1000000, "Amount cannot exceed $1,000,000")
        .refine(val => Number(val.toFixed(2)) === val, { message: "Amount cannot have more than 2 decimal places" }),
    category: z.enum(["Food", "Transport", "Utilities", "Entertainment", "Shopping", "Bills", "Healthcare", "Salary", "Freelance", "Investment", "Other"], {
        errorMap: () => ({ message: "Please select a valid category" })
    }),
    description: z.string({
        required_error: "Description is required",
        invalid_type_error: "Description must be text"
    })
        .min(3, "Description must be at least 3 characters")
        .max(200, "Description cannot exceed 200 characters")
        .refine(val => !/^\s*$/.test(val), { message: "Description cannot be empty or whitespace" }),
    date: z.coerce.date({
        required_error: "Date is required",
        invalid_type_error: "Invalid date"
    }).refine(date => {
        const now = new Date();
        const oneYearAgo = new Date(); oneYearAgo.setFullYear(now.getFullYear() - 1);
        const oneYearFromNow = new Date(); oneYearFromNow.setFullYear(now.getFullYear() + 1);
        return date >= oneYearAgo && date <= oneYearFromNow;
    }, { message: "Date must be within the last year or next year" }),
    userId: z.string({
        required_error: "User ID is required",
        invalid_type_error: "User ID must be a string"
    })
        .min(1, "User ID cannot be empty")
        .max(100, "User ID cannot exceed 100 characters")
});

export { expenseSchema };