import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import "@testing-library/jest-dom";
import { CustomTooltip, InfoTooltip } from "../Library/Tooltip";

describe("CustomTooltip Component", () => {
  it("displays hover text on mouse enter", () => {
    render(
      <CustomTooltip hoverText="Hover Text">
        <button>Hover me</button>
      </CustomTooltip>
    );

    const button = screen.getByText("Hover me");
    fireEvent.mouseEnter(button);

    const tooltip = screen.getByText("Hover Text");
    expect(tooltip).toBeInTheDocument();
  });

  it("displays click text when clicked", async () => {
    render(
      <CustomTooltip hoverText="Hover Text" clickText="Clicked!">
        <button>Click me</button>
      </CustomTooltip>
    );

    const button = screen.getByText("Click me");
    fireEvent.click(button);

    const tooltip = screen.getByText("Clicked!");
    expect(tooltip).toBeInTheDocument();
  });
});

describe("InfoTooltip Component", () => {
  it("displays hover text on mouse enter", () => {
    render(
      <InfoTooltip hoverText="Info Hover Text">
        <button>Hover for info</button>
      </InfoTooltip>
    );

    const button = screen.getByText("Hover for info");
    fireEvent.mouseEnter(button);

    const tooltip = screen.getByText("Info Hover Text");
    expect(tooltip).toBeInTheDocument();
  });

  it("displays click text when clicked", async () => {
    render(
      <InfoTooltip hoverText="Info Hover Text" clickText="Info Clicked!">
        <button>Click for info</button>
      </InfoTooltip>
    );

    const button = screen.getByText("Click for info");
    fireEvent.click(button);

    const tooltip = screen.getByText("Info Clicked!");
    expect(tooltip).toBeInTheDocument();
  });
});
