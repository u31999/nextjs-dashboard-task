"use client";
import type { User } from "@acme/data";

export default function UserTable({ rows }: { rows: User[] }) {
  return (
    <table style={{ borderCollapse: "collapse", width: "100%" }}>
      <thead>
        <tr>
          {["ID", "Name", "Email"].map(h => (
            <th key={h} style={{ borderBottom: "1px solid #ddd", textAlign: "left", padding: 8 }}>{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map(u => (
          <tr key={u.id}>
            <td style={{ borderBottom: "1px solid #f0f0f0", padding: 8 }}>{u.id}</td>
            <td style={{ borderBottom: "1px solid #f0f0f0", padding: 8 }}>{u.name}</td>
            <td style={{ borderBottom: "1px solid #f0f0f0", padding: 8 }}>{u.email}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
