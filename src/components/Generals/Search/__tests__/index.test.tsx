
import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";

import Search from ".."; // Adjust the import according to your folder structure

describe("Search Component", () => {
  it("renders the search input", () => {
    render(<Search value="" onSearch={jest.fn()} />);
    const searchInput = screen.getByPlaceholderText(/Search contacts.../i);
    expect(searchInput).toBeInTheDocument();
  });

  it("fires the onSearch function on input change", () => {
    const mockOnSearch = jest.fn();
    render(<Search value="" onSearch={mockOnSearch} />);

    const searchInput = screen.getByPlaceholderText(/Search contacts.../i);
    fireEvent.change(searchInput, { target: { value: "Gadani" } });

    expect(mockOnSearch).toHaveBeenCalledWith("Gadani");
  });

  it("displays a loading indicator when isLoading is true", () => {
    render(<Search value="" onSearch={jest.fn()} isLoading />);
    const loader = screen.getByText(/Loading.../i);
    expect(loader).toBeInTheDocument();
  });

  it("sets focus on the input when isLoading is false", async () => {
    render(<Search value="" onSearch={jest.fn()} isLoading={false} />);

    const searchInput = screen.getByPlaceholderText(/Search contacts.../i);
    await waitFor(() => expect(searchInput).toHaveFocus());
  });

  it("renders custom placeholder if provided", () => {
    render(
      <Search value="" onSearch={jest.fn()} placeholder="Search users..." />,
    );

    const searchInput = screen.getByPlaceholderText(/Search users.../i);
    expect(searchInput).toBeInTheDocument();
  });
});
