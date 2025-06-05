
// components/Grid.tsx
import React from "react";
import "../../assets/styles/grid.css";

interface GridProps {
  children: React.ReactNode;
  className?: string;
  [key: string]: any;
}

export const Grid = (props: GridProps) => {
  const { children, className = '', ...rest } = props;

  return (
    <div className={`grid ${className}`} {...rest}>
      {children}
    </div>
  );
};

interface ColProps {
  children: React.ReactNode;
  className?: string;
  span?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
  [key: string]: any;
}

export const Col = (props: ColProps) => {
  const {
    children,
    className = '',
    span = 12,
    sm,
    md,
    lg,
    xl,
    ...rest
  } = props;

  const classes = [
    'col',
    span ? `col-${span}` : '',
    sm ? `col-sm-${sm}` : '',
    md ? `col-md-${md}` : '',
    lg ? `col-lg-${lg}` : '',
    xl ? `col-xl-${xl}` : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  );
};
