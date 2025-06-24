import { Header } from "../header/header";
import { Footer } from "../footer/footer";
import { Outlet } from "react-router-dom";

interface Props {
  id?: string;
}

export const BaseLayout = ({ id }: Props) => {
  return (
    <div id={id} style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header title={"MSP Trade Locator"} />
      <div style={{ flex: 1 }}>
        <div className="container mt-5">
          <Outlet />
        </div>
      </div>
      <Footer title={"Powered by MSP Software Solutions"} />
    </div>
  );
}
