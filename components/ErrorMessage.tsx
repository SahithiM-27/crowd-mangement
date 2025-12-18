"use client";

import React from "react";

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <p style={{ color: "red", marginTop: 8 }}>
      {message}
    </p>
  );
};

export default ErrorMessage;
