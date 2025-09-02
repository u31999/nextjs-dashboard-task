import Link from "next/link";

export default function Home() {
  return (
    <main style={{ padding: 24 }}>
      <h1>Home</h1>
      <p>Go to your <Link href="/dashboard">Dashboard</Link>.</p>
    </main>
  );
}
