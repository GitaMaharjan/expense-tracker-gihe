"use client";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-[#0f172a] to-[#1e3a8a] text-white px-4">
      {/* Logo / Icon */}
      <div className="mb-8 flex items-center justify-center">
        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-blue-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8c-3.333 0-6 2-6 4s2.667 4 6 4 6-2 6-4-2.667-4-6-4z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v2m0 12v2m8-8h2M4 12H2"
            />
          </svg>
        </div>
      </div>

      {/* Heading */}
      <h1 className="text-4xl font-bold mb-4 text-center drop-shadow-lg">
        Welcome to GIHE Expense Tracker
      </h1>
      <p className="text-lg mb-8 text-center drop-shadow-md max-w-md">
        Manage your finances easily and track your expenses effortlessly.
      </p>

      {/* Login Button */}
      <Link
        href="/login"
        className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors"
      >
        Login
      </Link>
    </main>
  );
}
