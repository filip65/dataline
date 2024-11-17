import { it, expect, describe, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import MaskedInput from "../Settings/MaskedInput";

describe("MaskedInput Component", () => {
  it("renders the input with the provided value and placeholder", () => {
    render(
      <MaskedInput
        value="password123"
        onChange={() => {}}
        placeholder="Enter password"
      />
    );

    const inputElement = screen.getByPlaceholderText("Enter password");
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveValue("password123");
  });

  it("input is initially masked (type='password')", () => {
    render(<MaskedInput value="password123" onChange={() => {}} />);

    const inputElement = screen.getByDisplayValue("password123");
    expect(inputElement).toHaveAttribute("type", "password");
  });

  it("toggles between masked and unmasked when icon is clicked", () => {
    render(<MaskedInput value="password123" onChange={() => {}} />);

    const iconElement = screen.getByTestId("mask-toggle");
    const inputElement = screen.getByDisplayValue("password123");

    expect(inputElement).toHaveAttribute("type", "password");

    fireEvent.click(iconElement);
    expect(inputElement).toHaveAttribute("type", "text");
  });

  it("calls onChange when input value changes", () => {
    const handleChange = vi.fn();
    render(<MaskedInput onChange={handleChange} />);

    const inputElement = screen.getByTestId("input");
    fireEvent.change(inputElement, { target: { value: "new value" } });

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith("new value");
  });

  it("calls onKeyUp when a key is released", () => {
    const handleKeyUp = vi.fn();
    render(<MaskedInput onChange={() => {}} onKeyUp={handleKeyUp} />);

    const inputElement = screen.getByTestId("input");
    fireEvent.keyUp(inputElement, { key: "A", code: "KeyA" });

    expect(handleKeyUp).toHaveBeenCalledTimes(1);
    expect(handleKeyUp.mock.calls[0][0].key).toBe("A");
  });
});
