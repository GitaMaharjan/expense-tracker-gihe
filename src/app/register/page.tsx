"use client";

import { FormEvent, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { register } from "@/actions/register";

export default function Register() {
  const [error, setError] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const ref = useRef<HTMLFormElement>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const formData = new FormData(event.currentTarget);

    const r = await register({
      email: formData.get("email"),
      password: formData.get("password"),
      name: formData.get("name"),
    });
    ref.current?.reset();
    setIsLoading(false);

    if (r?.error) {
      setError(r.error);
      return;
    } else {
      router.push("/login");
    }
  };

  return (
    <section className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-[#0b1e3d] to-[#1e3c72]">
      <form
        ref={ref}
        onSubmit={handleSubmit}
        className="p-8 w-full max-w-[400px] flex flex-col gap-5
          bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-lg
          transition-transform transform hover:scale-105 duration-300"
      >
        <h1 className="text-3xl font-extrabold text-white text-center mb-4">
          Create Account
        </h1>

        {error && (
          <div className="text-red-400 bg-red-900/30 p-2 rounded text-center">
            {error}
          </div>
        )}

        <div className="flex flex-col gap-2">
          <label className="text-white/80 text-sm">Full Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your full name"
            className="text-white placeholder-white/50 bg-white/10 border border-white/30
                       focus:border-[#3b82f6] focus:ring-1 focus:ring-[#3b82f6] rounded px-3 py-2 transition"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-white/80 text-sm">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            className="text-white placeholder-white/50 bg-white/10 border border-white/30
                       focus:border-[#3b82f6] focus:ring-1 focus:ring-[#3b82f6] rounded px-3 py-2 transition"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-white/80 text-sm">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            className="text-white placeholder-white/50 bg-white/10 border border-white/30
                       focus:border-[#3b82f6] focus:ring-1 focus:ring-[#3b82f6] rounded px-3 py-2 transition"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="bg-gradient-to-r from-[#1e3c72] to-[#3b82f6] text-white font-semibold
                     py-2 rounded-lg shadow-md hover:scale-105 transition-transform"
        >
          {isLoading ? "Signing Up..." : "Sign Up"}
        </button>

        <p className="text-white/70 text-sm text-center">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-[#3b82f6] hover:text-white font-medium transition-colors"
          >
            Sign In
          </Link>
        </p>
      </form>
    </section>
  );
}
