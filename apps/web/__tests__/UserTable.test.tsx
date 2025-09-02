import { render, screen, within } from "@testing-library/react";
import React from "react";
import UserTable from "@/components/UserTable";

const rows = [
  { id: 1, name: "Alice Jensen", email: "alice@example.com" },
  { id: 2, name: "Brian Ortiz",  email: "brian@example.com" },
  { id: 3, name: "Carla N.",     email: "carla@example.com" }
];

describe("UserTable", () => {
  it("renders header and all rows", () => {
    render(<UserTable rows={rows} />);
    // headers
    expect(screen.getByText("ID")).toBeInTheDocument();
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Email")).toBeInTheDocument();

    // rows (basic presence)
    for (const r of rows) {
      const row = screen.getByText(r.name).closest("tr");
      expect(row).toBeInTheDocument();
      const utils = within(row as HTMLElement);
      expect(utils.getByText(String(r.id))).toBeInTheDocument();
      expect(utils.getByText(r.email)).toBeInTheDocument();
    }
  });
});
