import { render, screen } from "@testing-library/react";
import { LoadingDisplay } from "../LoadingDisplay";

describe("LoadingDisplay", () => {
  it("should render the default loading message", () => {
    render(<LoadingDisplay />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("should render a custom message", () => {
    render(<LoadingDisplay message="Fetching data..." />);
    expect(screen.getByText("Fetching data...")).toBeInTheDocument();
  });

  it("should render a Spin component", () => {
    render(<LoadingDisplay />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
    expect(document.querySelector(".ant-spin")).toBeInTheDocument();
  });
});
