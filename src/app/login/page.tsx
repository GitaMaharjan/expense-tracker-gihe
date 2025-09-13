"use client";

import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);
    const res = await signIn("credentials", {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      redirect: false,
    });

    setIsLoading(false);

    if (res?.error) setError(res.error as string);
    if (res?.ok) router.push("/dashboard");
  };

  return (
    <section className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-[#0b1e3d] to-[#1e3c72]">
      <form
        className="p-8 w-full max-w-[400px] flex flex-col gap-5
          bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-lg
          transition-transform transform hover:scale-105 duration-300"
        onSubmit={handleSubmit}
      >
        <h1 className="text-3xl font-extrabold text-white text-center mb-4">
          Welcome Back
        </h1>

        {error && (
          <div className="text-red-400 bg-red-900/30 p-2 rounded text-center">
            {error}
          </div>
        )}

        <div className="flex flex-col gap-2">
          <Label className="text-white/80 text-sm" htmlFor="email">
            Email address
          </Label>
          <Input
            id="email"
            type="email"
            name="email"
            placeholder="Enter your email"
            className="text-white placeholder-white/50 bg-white/10 border border-white/30
                       focus:border-[#3b82f6] focus:ring-1 focus:ring-[#3b82f6] transition"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label className="text-white/80 text-sm" htmlFor="password">
            Password
          </Label>
          <Input
            id="password"
            type="password"
            name="password"
            placeholder="Enter your password"
            className="text-white placeholder-white/50 bg-white/10 border border-white/30
                       focus:border-[#3b82f6] focus:ring-1 focus:ring-[#3b82f6] transition"
          />
        </div>

        <Button
          type="submit"
          className="bg-gradient-to-r from-[#1e3c72] to-[#3b82f6] text-white font-semibold
                     py-2 rounded-lg shadow-md hover:scale-105 transition-transform"
          disabled={isLoading}
        >
          {isLoading ? "Signing In..." : "Sign In"}
        </Button>

        <p className="text-white/70 text-sm text-center">
          Don't have an account?{" "}
          <Link
            href="/register"
            className="text-[#3b82f6] hover:text-white font-medium transition-colors"
          >
            Sign Up
          </Link>
        </p>
      </form>
    </section>
  );
}
