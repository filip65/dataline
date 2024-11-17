import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import "@testing-library/jest-dom";
import Toggle from "../Inputs/Toggle";

describe("Toggle", () => {
  it("renders the switch component", () => {
    render(<Toggle enabled={true} />);
    const switchElement = screen.getByRole("switch");
    expect(switchElement).toBeInTheDocument();
  });

  it("reflects the initial enabled state", () => {
    render(<Toggle enabled={true} />);
    const switchElement = screen.getByRole("switch");
    expect(switchElement).toBeChecked();
  });

  it("reflects the initial disabled state", () => {
    render(<Toggle enabled={false} />);
    const switchElement = screen.getByRole("switch");
    expect(switchElement).not.toBeChecked();
  });
});
