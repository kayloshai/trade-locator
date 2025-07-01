import { Link, useLocation } from "react-router-dom";

interface Props {
    className?: string;
}

export const Garden = ({ className }: Props) => {
    const location = useLocation();

    return (
        <div className={`container py-5 ${className || ""}`} id="garden-page">
            <h1 className="mb-4 text-center">Garden & Landscaping Services</h1>
            <div className="row mb-4">
                <div className="col-12">
                    <div className="alert alert-success text-center" role="alert">
                        <strong>Need Urgent Garden Help?</strong><br />
                        Storm damage? Fallen tree? Broken irrigation?<br />
                        <Link
                            to="/services"
                            className="btn btn-danger mt-2"
                            state={{ fromPage: location.pathname }}
                        >
                            Request Emergency Gardener
                        </Link>
                        <div className="mt-2 small text-muted">Available 7 days a week for urgent garden issues</div>
                    </div>
                </div>
            </div>
            <div className="row mb-4">
                <div className="col-md-6 mb-3">
                    <div className="card shadow-sm h-100">
                        <div className="card-body">
                            <h5 className="card-title">General Inquiries</h5>
                            <p className="card-text">
                                Need regular maintenance, landscaping, or advice? Our gardeners can help with mowing, planting, design, and more.
                            </p>
                            <button className="btn btn-primary">Book a Gardener</button>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 mb-3">
                    <div className="card shadow-sm h-100">
                        <div className="card-body">
                            <h5 className="card-title">Quote & Pricing</h5>
                            <p className="card-text">
                                Get an instant quote for your garden or landscaping project. Transparent pricing, no hidden fees.
                            </p>
                            <Link to="/quote" state={{ fromPage: location.pathname }} className="btn btn-outline-primary">Get Instant Quote</Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h5 className="card-title">How It Works</h5>
                            <ol>
                                <li>Choose your service (emergency, general, or quote).</li>
                                <li>Book instantly or request a callback.</li>
                                <li>A qualified gardener will be dispatched to your location.</li>
                                <li>Track your gardener in real-time and rate your experience!</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}