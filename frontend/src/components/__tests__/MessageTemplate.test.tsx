import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import "@testing-library/jest-dom";
import MessageTemplate from "../Conversation/MessageTemplate";

describe("MessageTemplate Component", () => {
  it("renders the text content", () => {
    render(<MessageTemplate text="Hello, World!" />);
    const textElement = screen.getByText("Hello, World!");
    expect(textElement).toBeInTheDocument();
  });

  it("renders with title and text", () => {
    render(<MessageTemplate title="Sample Title" text="Sample Text" />);
    const titleElement = screen.getByText("Sample Title");
    const textElement = screen.getByText("Sample Text");

    expect(titleElement).toBeInTheDocument();
    expect(textElement).toBeInTheDocument();
  });

  it("calls onClick when clicked", () => {
    const handleClick = vi.fn();
    render(<MessageTemplate text="Click Me" onClick={handleClick} />);
    const container = screen.getByText("Click Me");

    fireEvent.click(container);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
