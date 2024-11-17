import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import "@testing-library/jest-dom";
import { Spinner } from "../Spinner/Spinner";

describe("Spinner Component", () => {
  it("renders the spinner and is in the document", () => {
    render(<Spinner />);

    const svgElement = screen.getByTestId("spinner");

    expect(svgElement).toBeInTheDocument();
  });
});
