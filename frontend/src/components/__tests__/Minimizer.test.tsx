import { it, expect, describe, vi } from "vitest";
import Minimizer from "../Minimizer/Minimizer";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("Minimizer", () => {
  it("renders with label when minimized", () => {
    const setMinimized = vi.fn();
    render(
      <Minimizer
        minimized={true}
        setMinimized={setMinimized}
        label="Test Label"
      >
        <div>Content</div>
      </Minimizer>
    );

    expect(screen.getByText("Test Label")).toBeVisible();

    expect(screen.queryByText("Content")).not.toBeInTheDocument();
  });

  it("expands to show children when clicking the expand button", () => {
    const setMinimized = vi.fn((minimized) => !minimized);
    render(
      <Minimizer
        minimized={true}
        setMinimized={setMinimized}
        label="Test Label"
      >
        <div>Content</div>
      </Minimizer>
    );

    const expandButton = screen.getByTestId("expand-button");
    fireEvent.click(expandButton);

    expect(setMinimized).toHaveBeenCalledWith(false);
  });

  it("displays children content when not minimized", () => {
    const setMinimized = vi.fn();
    render(
      <Minimizer
        minimized={false}
        setMinimized={setMinimized}
        label="Test Label"
      >
        <div>Content</div>
      </Minimizer>
    );

    expect(screen.getByText("Content")).toBeVisible();
  });

  it("collapses back when clicking the container", () => {
    const setMinimized = vi.fn();
    render(
      <Minimizer
        minimized={true}
        setMinimized={setMinimized}
        label="Test Label"
      >
        <div>Content</div>
      </Minimizer>
    );

    fireEvent.click(screen.getByText("Test Label"));

    expect(setMinimized).toHaveBeenCalledWith(false);
  });
});
