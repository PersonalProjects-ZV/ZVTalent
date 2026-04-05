"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Login failed");
        setLoading(false);
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      if (data.user.role === "hr") {
        router.push("/dashboard");
      } else {
        router.push("/");
      }
    } catch {
      setError("Network error. Please try again.");
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="flex items-center justify-center min-h-[80vh] px-4">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold text-center">Welcome Back</h1>
          <p className="text-gray-400 text-center mt-2">
            Sign in to your account
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            {error && (
              <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3">
                {error}
              </div>
            )}

            <div>
              <label className="text-sm text-gray-500">Email Address</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full mt-1 py-3 border-b border-gray-200 focus:border-black outline-none transition-colors"
                required
              />
            </div>

            <div>
              <label className="text-sm text-gray-500">Password</label>
              <input
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full mt-1 py-3 border-b border-gray-200 focus:border-black outline-none transition-colors"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-colors disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p className="text-center text-sm text-gray-400 mt-6">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="text-black font-medium hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </main>
    </>
  );
}
