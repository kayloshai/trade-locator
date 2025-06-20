import { Header } from "../header/header";
import { Footer } from "../footer/footer";
import { Link, Outlet } from "react-router-dom";

interface Props {
  id?: string;
}

export const BaseLayout = ({ id }: Props) => {

  return (
    <div id={id}>
      <Header title={"MSP Software Solutions"} />
      <div>
        <div className="container mt-5">
          <div className="row">
            <div className="col-sm-4">
              <h2>About Us</h2>
              {/* <h5>Photo of me:</h5> */}
              {/* <div className="fakeimg">Fake Image</div> */}
              <p>We provide world class services at the tip of your fingers in the comfort of your home.</p>
              <h3 className="mt-4">Categories</h3>
              <p>Offered services in several categories</p>
              <ul className="nav nav-pills flex-column">
                <Link to="plumbing">
                  <li className="nav-item">
                    <a className="nav-link" href="plumbing">Plumbing</a>
                  </li>
                </Link>
                <Link to="/carpentry">
                  <li className="nav-item">
                    <a className="nav-link" href="carpentry">Carpentry</a>
                  </li></Link>
                <Link to="/masonry">
                  <li className="nav-item">
                    <a className="nav-link" href="masonry">Masonry</a>
                  </li></Link>
                <Link to="/engineering">
                  <li className="nav-item">
                    <a className="nav-link" href="engineering">Engineering</a>
                  </li></Link>
              </ul>
              <hr className="d-sm-none" />
            </div>
            <div className="col-sm-8" style={{ overflow: "auto" }}>
              <Outlet />
            </div>
          </div>
        </div>
      </div>
      <Footer title={"MSP Software Solutions"} />
    </div>
  );
}
