import { describe, expect, it, jest } from "@jest/globals";
import { fireEvent, render, screen } from "@testing-library/react";

import Button from "./Button";

describe("Button Component", () => {
  // Test 1: Renders with default variant
  it("renders with default variant", () => {
    render(<Button onClick={() => {}}>Click Me</Button>);

    const button = screen.getByRole("button", { name: /click me/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("bg-blue-500");
  });
  // Test 2: Renders with primary variant
  it("renders with primary variant", () => {
    render(
      <Button variant="primary" onClick={() => {}}>
        Primary Button
      </Button>
    );

    const button = screen.getByRole("button", { name: /primary button/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("bg-red-500");
  });

  // Test 3: Renders with secondary variant
  it("renders with secondary variant", () => {
    render(
      <Button variant="secondary" onClick={() => {}}>
        Secondary Button
      </Button>
    );

    const button = screen.getByRole("button", { name: /secondary button/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("bg-black");
  });

  // Test 4: Calls onClick handler when clicked
  it("calls onClick handler when clicked", () => {
    const handleClick = jest.fn(); // Mock function
    render(<Button onClick={handleClick}>Click Me</Button>);

    const button = screen.getByRole("button", { name: /click me/i });
    fireEvent.click(button); // Simulate a click
    expect(handleClick).toHaveBeenCalledTimes(1); // Ensure the handler was called
  });
});
