import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import "@testing-library/jest-dom";
import LimitNumberField from "../Inputs/LimitNumberField";

describe("LimitNumberField Component", () => {
  it("renders the component with the correct placeholder.", () => {
    render(<LimitNumberField placeholder={100} />);

    const inputElement = screen.getByPlaceholderText("200");
    expect(inputElement).toBeInTheDocument();
  });

  it("applies the 'disabled' state correctly", () => {
    render(<LimitNumberField placeholder={100} disabled />);

    const inputElement = screen.getByPlaceholderText("100");
    expect(inputElement).toBeDisabled();
  });

  it("calls onChange with the correct value", () => {
    const handleChange = vi.fn();
    render(<LimitNumberField placeholder={100} onChange={handleChange} />);

    const inputElement = screen.getByPlaceholderText("100");

    fireEvent.change(inputElement, { target: { value: "150" } });
    expect(handleChange).toHaveBeenCalledWith(150);
  });

  it("calls onKeyDown when a key is pressed", () => {
    const handleKeyDown = vi.fn();
    render(<LimitNumberField placeholder={100} onKeyDown={handleKeyDown} />);

    const inputElement = screen.getByPlaceholderText("100");

    fireEvent.keyDown(inputElement, { key: "Enter", code: "Enter" });
    expect(handleKeyDown).toHaveBeenCalled();
  });

  it("displays the tooltip icon with correct attributes", () => {
    render(<LimitNumberField placeholder={100} />);

    const tooltipIcon = screen.getByTestId("tooltip-icon");

    expect(tooltipIcon).toBeInTheDocument();
  });
});
