"use client";

import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ children, ...rest }) => {
  return (
    <button
      style={{
        marginTop: 16,
        padding: "8px 16px",
        backgroundColor: "#2563eb",
        color: "white",
        borderRadius: 4,
        border: "none",
        cursor: rest.disabled ? "not-allowed" : "pointer",
      }}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
