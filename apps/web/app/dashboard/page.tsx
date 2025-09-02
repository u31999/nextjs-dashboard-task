import UserTable from "@/components/UserTable";
import { absolute } from "@/lib/absolute";

type User = { id: number; name: string; email: string };

async function getUsers(): Promise<User[]> {
  const res = await fetch(absolute("/api/users"), { cache: "no-store" });
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
