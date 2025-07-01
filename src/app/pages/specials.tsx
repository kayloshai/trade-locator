import { Link } from "react-router-dom";
import { useAuth } from "../auth/proctectedRoute";

interface Props {
    className?: string;
}

export const Specials = ({ className }: Props) => {
    const { user } = useAuth();

    return (
        <div className={`container py-5 ${className || ""}`} id="specials-page">
            <h1 className="mb-4 text-center">Special Offers</h1>
            <p className="lead text-center mb-5">
                Check back soon for our latest deals and special offers!
            </p>
            <div className="d-flex justify-content-center">
                <div className="card shadow-sm" style={{ maxWidth: 400 }}>
                    <div className="card-body text-center">
                        <h5 className="card-title">No specials available right now</h5>
                        <p className="card-text">Sign up for our newsletter to be the first to know about new promotions.</p>
                        {!user && (
                            <Link to="/sign-up" className="btn btn-primary">
                                Sign Up for Updates
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}