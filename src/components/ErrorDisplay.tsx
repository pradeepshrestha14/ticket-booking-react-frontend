import React from "react";
import { Alert, Button } from "antd";

interface ErrorDisplayProps {
  message: string;
  description?: string;
  onRetry?: () => void;
}

/**
 * Component to display error messages with optional retry button.
 * @param message - The error message.
 * @param description - Optional error description.
 * @param onRetry - Optional retry handler.
 */
export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({
  message,
  description,
  onRetry,
}) => (
  <Alert
    message={message}
    description={description}
    type="error"
    showIcon
    action={
      onRetry ? (
        <Button size="small" onClick={onRetry}>
          Retry
        </Button>
      ) : undefined
    }
    style={{ marginBottom: 24 }}
  />
);
