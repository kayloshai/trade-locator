import { Link, useLocation } from "react-router-dom";

interface Props {
    className?: string;
}

export const Electrical = ({ className }: Props) => {
    const location = useLocation();

    return (
        <div className={`container py-5 ${className || ""}`} id="electrical-page">
            <h1 className="mb-4 text-center">Electrical Services</h1>
            <div className="row mb-4">
                <div className="col-12">
                    <div className="alert alert-danger text-center" role="alert">
                        <strong>Emergency Electrical Help</strong><br />
                        Power outage? Exposed wires? Electrical fire risk?<br />
                        <button className="btn btn-danger mt-2">Request Emergency Electrician</button>
                        <div className="mt-2 small text-muted">Available 24/7 for urgent electrical issues</div>
                    </div>
                </div>
            </div>
            <div className="row mb-4">
                <div className="col-md-6 mb-3">
                    <div className="card shadow-sm h-100">
                        <div className="card-body">
                            <h5 className="card-title">General Inquiries</h5>
                            <p className="card-text">
                                Need help with installations, repairs, or upgrades? Our certified electricians can assist with lighting, wiring, and more.
                            </p>
                            <button className="btn btn-primary">Book an Electrician</button>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 mb-3">
                    <div className="card shadow-sm h-100">
                        <div className="card-body">
                            <h5 className="card-title">Quote & Pricing</h5>
                            <p className="card-text">
                                Get an instant quote for your electrical needs. Transparent pricing, no hidden fees.
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
                                <li>A qualified electrician will be dispatched to your location.</li>
                                <li>Track your electrician in real-time and rate your experience!</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};