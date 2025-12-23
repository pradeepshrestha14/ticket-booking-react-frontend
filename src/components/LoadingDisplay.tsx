import React from "react";
import { Spin } from "antd";

interface LoadingDisplayProps {
  message?: string;
}

/**
 * Component to display a loading spinner with optional message.
 * @param message - The loading message to display.
 */
export const LoadingDisplay: React.FC<LoadingDisplayProps> = ({
  message = "Loading...",
}) => (
  <div style={{ textAlign: "center", width: "100%" }}>
    <Spin size="large" />
    <p>{message}</p>
  </div>
);
