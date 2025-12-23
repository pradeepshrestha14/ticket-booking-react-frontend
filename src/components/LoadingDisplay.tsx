import React from "react";
import { Spin } from "antd";

interface LoadingDisplayProps {
  message?: string;
}

export const LoadingDisplay: React.FC<LoadingDisplayProps> = ({
  message = "Loading...",
}) => (
  <div style={{ textAlign: "center", width: "100%" }}>
    <Spin size="large" />
    <p>{message}</p>
  </div>
);
