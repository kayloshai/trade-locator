import React from "react";
import { Grid, Col } from "../layouts/grid"

interface Props {
  className?: string;
  onClick?: () => void;
  children?: React.ReactNode;
}

export const Footer = ({children}: Props) => {
  return (
    <footer
      style={{
        background: "#004080",
        color: "white",
        padding: "1rem",
        position: "sticky",
        bottom: 0,
        zIndex: 10,
      }}
    >
      <Grid>
        <Col span={12}>
          <div style={{ textAlign: "center" }}>
            © {new Date().getFullYear()} {children}
          </div>
        </Col>
      </Grid>
    </footer>
  );
};
