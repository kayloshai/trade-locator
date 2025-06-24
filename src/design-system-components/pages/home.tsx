import { Link, Outlet } from "react-router-dom";
interface Props {
    className?: string;
}

export const Home = ({ className }: Props) => {

    return (
        <div className={className} id="home-page">
            <div className="row">
                <div className="col-sm-4">
                    <h3 className="mt-4">Services Offered</h3>
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
    );
}