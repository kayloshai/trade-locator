
// components/Grid.tsx
import React from "react";
import "../../assets/styles/grid.css";

interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const Grid: React.FC<GridProps> = ({ children, className = '', ...rest }) => {
  return (
    <div className={`grid ${className}`} {...rest}>
      {children}
    </div>
  );
};

interface ColProps extends React.HTMLAttributes<HTMLDivElement> {
  span?: number; // default to 12
  md?: number; // medium+ screen size span
  children: React.ReactNode;
}

export const Col: React.FC<ColProps> = ({ span = 12, md, children, className = '', ...rest }) => {
  const mdClass = md ? `col-md-${md}` : '';
  return (
    <div className={`col ${mdClass} ${className}`} {...rest}>
      {children}
    </div>
  );
};
