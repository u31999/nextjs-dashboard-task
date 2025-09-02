import UserTable from "@/components/UserTable";

type User = { id: number; name: string; email: string };

async function getUsers(): Promise<User[]> {
  const base = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";
  const url = new URL("/api/users", base).toString();

  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch users");
  const data = await res.json();
  return data.users as User[];
}

export default async function DashboardPage() {
  const rows = await getUsers();
  return (
    <main style={{ padding: 24 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1 style={{ marginBottom: 16 }}>Dashboard</h1>
        <form action="/api/logout" method="post">
          <button style={{ padding: 8, borderRadius: 6, border: "1px solid #ddd" }}>Logout</button>
        </form>
      </div>
      <UserTable rows={rows} />
    </main>
  );
}
