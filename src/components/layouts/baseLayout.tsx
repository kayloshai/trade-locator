// src/components/BaseLayout.tsx
import { Col } from "./grid"
import { Header } from "../header/header";
import { NavMenu } from "../navigation/horizontalNav";
import { Footer } from "../footer/footer";

interface Props {
  className?: string;
  title: string,
  content: React.ReactNode
  onClick?: () => any;
}

export const BaseLayout = ({className, title, content}: Props) => {

  return (
   <div style={{background: "#F8F9FA"}} className={className}>
   <Header>
        <h1>{title}</h1>
        <Col>
    <NavMenu/>
  </Col>
      </Header>
      <main style={{ padding: "2rem" }}>
        <p style={{color: "#1A1A1A"}}>{content}</p>
        {/* lots of content to scroll */}
        <div style={{ height: "60vh",color: "#1A1A1A"}}>Scroll down to test sticky header</div>
      </main>
      <Footer children={"MSP Software Solutions. All rights reserved."}/>

   </div>
  );
}
