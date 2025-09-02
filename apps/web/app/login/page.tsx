"use client";
import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("admin@example.com");
  const [password, setPassword] = useState("pass123");
  const [err, setErr] = useState<string | null>(null);
  const params = useSearchParams();
  const router = useRouter();
  const next = params.get("next") || "/dashboard";

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });
    if (res.ok) {
      router.push(next);
    } else {
      const data = await res.json().catch(() => ({}));
      setErr(data?.error || "Login failed");
    }
  }

  return (
    <main style={{ display: "grid", placeItems: "center", minHeight: "100vh" }}>
      <form onSubmit={onSubmit} style={{ width: 360, display: "grid", gap: 12 }}>
        <h1>Login</h1>
        <label>
          <div>Email</div>
          <input value={email} onChange={e => setEmail(e.target.value)} required
                 style={{ width: "100%", padding: 8, border: "1px solid #ccc", borderRadius: 6 }} />
        </label>
        <label>
          <div>Password</div>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required
                 style={{ width: "100%", padding: 8, border: "1px solid #ccc", borderRadius: 6 }} />
        </label>
        {err && <div style={{ color: "crimson" }}>{err}</div>}
        <button type="submit" style={{ padding: 10, borderRadius: 6, border: 0, background: "black", color: "white" }}>
          Sign in
        </button>
      </form>
    </main>
  );
}
