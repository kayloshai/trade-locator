// src/components/BaseLayout.tsx
import { Grid, Col } from "./grid"

interface Props {
  className?: string;
  onClick?: () => any;
}

export const BaseLayout = (props: Props) => {

  return (
   <>
    <Grid className={props.className}>
      <Col md={4}><div style={{ background: "#ddd", padding: "1rem" }}>Column 1</div></Col>
      <Col md={4}><div style={{ background: "#bbb", padding: "1rem" }}>Column 2</div></Col>
      <Col md={4}><div style={{ background: "#999", padding: "1rem" }}>Column 3</div></Col>
    </Grid>
   </>
  );
}
