import { Link } from "react-router-dom";

interface Props { }

export const Home = ({ }: Props) => {
    return (
        <div id="home-page" className="container py-5">
            <div className="text-center">
                <h1 className="mb-4">Welcome to Trade Locator</h1>
                <p className="lead mb-4">
                    This is a placeholder home page. Use the navigation menu to explore services, get instant quotes, or sign up for an account.
                </p>
                <div className="d-flex justify-content-center gap-3">
                    <a href="/trade-locator/specials" className="btn btn-primary">View Specials</a>
                    <Link to="/quote" className="btn btn-outline-secondary">Get a Quote</Link>
                </div>
            </div>
        </div>
    );
}