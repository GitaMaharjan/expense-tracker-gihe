import ExpenseControl from "./ExpenseControl";
import ExpenseList from "./ExpenseList";

const getExpenses = async () => {
  const res = await fetch(`${process.env.BASE_URI}/api/expenses/get-expenses`, {
    // cache: "no-store",
    credentials: "include",
  });
  const data = await res.json();
  return data;
};

export default async function Page() {
  const expenses = await getExpenses();

  return (
    <div className="space-y-6">
      <ExpenseControl />
      <ExpenseList initialExpenses={expenses} />
    </div>
  );
}
