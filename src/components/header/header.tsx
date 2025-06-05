// src/components/StickyHeader.tsx
import React from "react";

interface Props {
  className?: string;
  onClick?: () => void;
  children?: React.ReactNode;
}

export const Header = ({ className, onClick, children }: Props) => {
  return (
    <header
      className={className}
      onClick={onClick}
      style={{
        position: "sticky",
        top: 0,
        backgroundColor: "#002244 ",
        borderBottom: "1px solid #ddd",
        padding: "1rem 2rem",
        zIndex: 1000,
      }}
    >
      {children}
    </header>
  );
};
