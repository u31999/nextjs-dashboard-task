/**
 * We mock global.fetch to return the same payload as /api/users.
 * Then we render the server component by importing it and awaiting the default export.
 */
import React from "react";
import { render, screen, within } from "@testing-library/react";

// Mock fetch for the server function in page.tsx
const mockUsers = [
  { id: 1, name: "Alice Jensen", email: "alice@example.com" },
  { id: 2, name: "Brian Ortiz",  email: "brian@example.com" }
];

vi.stubGlobal("fetch", async (input: RequestInfo | URL, init?: RequestInit) => {
  const url = typeof input === "string" ? input : input.toString();
  if (url.includes("/api/users")) {
    return new Response(JSON.stringify({ users: mockUsers }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    }) as unknown as Response;
  }
  return new Response("Not Found", { status: 404 }) as unknown as Response;
});

describe("DashboardPage (server fetch)", () => {
  it("renders users returned by the API", async () => {
    // Import server component dynamically (ESM)
    const mod = await import("@/app/dashboard/page");
    const DashboardPage = mod.default;

    // Render the server component
    const ui = await DashboardPage();
    // @testing-library/react can render the returned JSX
    render(ui as React.ReactElement);

    // Assert table shows API data
    for (const u of mockUsers) {
      const row = screen.getByText(u.name).closest("tr");
      expect(row).toBeInTheDocument();
      const utils = within(row as HTMLElement);
      expect(utils.getByText(String(u.id))).toBeInTheDocument();
      expect(utils.getByText(u.email)).toBeInTheDocument();
    }
  });
});
