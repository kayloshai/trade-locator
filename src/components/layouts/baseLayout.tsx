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
  <Col sm={6} md={4} lg={3} xl={2}>
    <div style={{ background: "#ccc", padding: "1rem" }}>Responsive Column</div>
  </Col>
  <Col sm={6} md={8} lg={9} xl={10}>
    <div style={{ background: "#aaa", padding: "1rem" }}>Another Column</div>
  </Col>
</Grid>

   </>
  );
}
