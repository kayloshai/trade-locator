import { Header } from "../header/header";
import { Footer } from "../footer/footer";
import { Outlet } from "react-router-dom";

interface Props {
  id?: string;
}

export const BaseLayout = ({ id }: Props) => {

  return (
    <div id={id}>
      <Header title={"MSP Software Solutions"} />
      <div>
        <div className="container mt-5">
          <Outlet />
        </div>
      </div>
      <Footer title={"MSP Software Solutions"} />
    </div>
  );
}
