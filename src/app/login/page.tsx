"use client";

import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Login() {
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const res = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });

    if (res?.error) {
      setError(res.error as string);
    }
    if (res?.ok) {
      return router.push("/dashboard");
    }
  };
  return (
    <section className="w-full h-screen flex items-center justify-center">
      <form
        className="p-6 w-full max-w-[400px] flex flex-col justify-between items-center gap-2 
        border border-solid border-black bg-white rounded"
        onSubmit={handleSubmit}
      >
        {error && <div className="text-black">{error}</div>}
        <h1 className="mb-5 w-full text-2xl font-bold">Sign In</h1>

        <Label className="w-full text-sm" htmlFor="email">
          Email address
        </Label>

        <Input type="email" placeholder="Email" name="email" />
        <Label className="w-full text-sm">Password</Label>
        <div className="flex w-full">
          <Input type="password" placeholder="Password" name="password" />
        </div>
        <Button variant="outline">Sign In</Button>

        <Link
          href="/register"
          className="text-sm text-[#888] transition duration-150 ease hover:text-black"
        >
          Don't have an account?
        </Link>
      </form>
    </section>
  );
}
