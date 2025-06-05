import { Grid, Col } from "../layouts/grid";

export const NavMenu = () => {
  return (
    <nav style={{ background: "#004080", color: "white", padding: "1rem" }}>
      <Grid>
        {/* Logo */}
        <Col sm={12} md={3} lg={2}>
          <div style={{ fontWeight: "bold", fontSize: "1.25rem" }}>MSP Logo</div>
        </Col>

        {/* Navigation Links */}
        <Col
          sm={12}
          md={6}
          lg={8}
          style={{ display: "flex", justifyContent: "center", gap: "2rem" }}
        >
          <a href="#home" style={{ color: "white", textDecoration: "none" }}>
            Home
          </a>
          <a href="#about" style={{ color: "white", textDecoration: "none" }}>
            About
          </a>
          <a href="#services" style={{ color: "white", textDecoration: "none" }}>
            Services
          </a>
          <a href="#contact" style={{ color: "white", textDecoration: "none" }}>
            Contact
          </a>
        </Col>

        {/* User Actions */}
        <Col
          sm={12}
          md={3}
          lg={2}
          style={{ display: "flex", justifyContent: "flex-end", gap: "1rem" }}
        >
          <button style={{ background: "#0066cc", color: "white", border: "none", padding: "0.5rem 1rem", borderRadius: "4px" }}>
            Login
          </button>
          <button style={{ background: "#00cc66", color: "white", border: "none", padding: "0.5rem 1rem", borderRadius: "4px" }}>
            Sign Up
          </button>
        </Col>
      </Grid>
    </nav>
  );
};
