import React from "react";

function ExpenseControl() {
  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-2">
        {/* Category Dropdown (static data) */}
        <select className="border text-sm px-2 py-1 rounded">
          <option value="">All Categories</option>
          <option value="Food">Food</option>
          <option value="Transport">Transport</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Shopping">Shopping</option>
          <option value="Rent">Rent</option>
          <option value="Health">Health</option>
          <option value="Other">Other</option>
        </select>

        <select className="border text-sm px-2 py-1 rounded">
          <option value="">All Types</option>
          <option value="Income">Income</option>
          <option value="Expense">Expense</option>
        </select>

        {/* <button className="bg-blue-500 text-white text-sm px-3 py-1 rounded">
          Apply
        </button> */}
      </div>

      <div className="flex gap-2">
        {/* Sort Dropdown */}
        <select className="border text-sm px-2 py-1 rounded">
          <option value="">Sort By</option>
          <option value="amount-asc">Amount (Low → High)</option>
          <option value="amount-desc">Amount (High → Low)</option>
          <option value="date-asc">Date (Oldest First)</option>
          <option value="date-desc">Date (Newest First)</option>
        </select>

        {/* <button className="bg-blue-500 text-white text-sm px-3 py-1 rounded">
          Apply
        </button> */}
      </div>
    </div>
  );
}

export default ExpenseControl;
