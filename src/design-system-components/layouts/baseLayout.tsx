import { Header } from "../header/header";
import { Footer } from "../footer/footer";
import { Card } from "../card/card";
//import { Placeholder } from "../placeholder/placeholder";

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
              <h2>About Me</h2>
              <h5>Photo of me:</h5>
              <div className="fakeimg">Fake Image</div>
              <p>Some text about me in culpa qui officia deserunt mollit anim..</p>
              <h3 className="mt-4">Some Links</h3>
              <p>Lorem ipsum dolor sit ame.</p>
              <ul className="nav nav-pills flex-column">
                <li className="nav-item">
                  <a className="nav-link active" href="#">Active</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Link</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Link</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link disabled" href="#">Disabled</a>
                </li>
              </ul>
              <hr className="d-sm-none" />
            </div>
            <div className="col-sm-8" style={{ overflow: "auto" }}>
              <Card />
              <Card />
              {/* <Placeholder /> */}
            </div>
          </div>
        </div>

      </div>
      <Footer title={"MSP Software Solutions"} />
    </div>
  );
}
