import { Link, useLocation } from "react-router-dom";

interface Props {
    className?: string;
}

export const Engineering = ({ className }: Props) => {
    const location = useLocation();

    return (
        <div className={`container py-5 ${className || ""}`} id="engineering-page">
            <h1 className="mb-4 text-center">Engineering Services</h1>
            <div className="row mb-4">
                <div className="col-12">
                    <div className="alert alert-danger text-center" role="alert">
                        <strong>Emergency Engineering Help</strong><br />
                        Structural failure? Urgent inspection needed? <br />
                        <Link
                            to="/emergency"
                            className="btn btn-danger mt-2"
                            state={{ fromPage: location.pathname }}
                        >
                            Request Emergency Engineer
                        </Link>
                        <div className="mt-2 small text-muted">Available 24/7 for critical issues</div>
                    </div>
                </div>
            </div>
            <div className="row mb-4">
                <div className="col-md-6 mb-3">
                    <div className="card shadow-sm h-100">
                        <div className="card-body">
                            <h5 className="card-title">General Inquiries</h5>
                            <p className="card-text">
                                Need advice or want to schedule an engineering consultation?
                                Our network includes civil, structural, and mechanical engineers for assessments, reports, and project planning.
                            </p>
                            <Link to="/quote" className="btn btn-outline-primary">Get a Quote</Link>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 mb-3">
                    <div className="card shadow-sm h-100">
                        <div className="card-body">
                            <h5 className="card-title">Quote & Pricing</h5>
                            <p className="card-text">
                                Get an instant quote for engineering services. Transparent pricing, no hidden fees.
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
                                <li>A qualified engineer will be assigned to your project or issue.</li>
                                <li>Track your engineer and receive detailed reports and updates.</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}