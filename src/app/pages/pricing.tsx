import { Link } from "react-router-dom";

interface PricingPlan {
    title: string;
    price: string;
    priceNote?: string;
    features: string[];
    buttonLabel: string;
    buttonVariant: "primary" | "outline-primary";
    highlight?: boolean;
    link?: string;
}

interface Props {
    className?: string;
}

// Pricing data as a JSON-like object
const pricingPlans: PricingPlan[] = [
    {
        title: "Emergency Services",
        price: "TBA",
        priceNote: "/ call-out",
        features: [
            "24/7 Rapid Response",
            "Plumbing, Electrical, Carpentry, Masonry Emergencies",
            "Certified Tradespeople",
            "On-site Assessment Included"
        ],
        buttonLabel: "Enquire Now",
        buttonVariant: "outline-primary",
        link: "/contact"
    },
    {
        title: "General Maintenance",
        price: "TBA",
        priceNote: "/ service",
        features: [
            "All Emergency Services Included",
            "Routine Plumbing, Carpentry, Masonry",
            "Garden & Landscaping",
            "Phone & Email Support"
        ],
        buttonLabel: "Enquire Now",
        buttonVariant: "primary",
        highlight: true,
        link: "/contact"
    },
    {
        title: "Engineering & Custom Solutions",
        price: "Custom",
        priceNote: "",
        features: [
            "Engineering Consultation",
            "Structural Assessments",
            "Large-scale or Multi-trade Projects",
            "Priority Response & Dedicated Support"
        ],
        buttonLabel: "Request Quote",
        buttonVariant: "outline-primary",
        link: "/quote"
    }
];

export const Pricing = ({ className }: Props) => {
    return (
        <main className={`container py-3 ${className || ""}`} id="pricing-page">
            <h1 className="mb-2 text-center">Service Pricing</h1>
            <p className="lead text-center mb-5">
                Transparent, competitive rates for urgent and scheduled work. Choose a plan or{" "}
                <Link to="/quote">request a custom quote</Link> for your project.
            </p>
            <div className="row row-cols-1 row-cols-md-3 mb-3 text-center g-4">
                {pricingPlans.map((plan, idx) => (
                    <div
                        className={`col d-flex align-items-stretch${plan.highlight ? " position-relative" : ""}`}
                        key={plan.title}
                    >
                        <div
                            className={
                                `card mb-4 rounded-3 shadow-sm h-100 d-flex flex-column` +
                                (plan.highlight ? " border-primary bg-light" : "")
                            }
                            style={
                                plan.highlight
                                    ? {
                                        zIndex: 2,
                                        boxShadow: "0 0.5rem 1.5rem rgba(0,123,255,.25)",
                                        transform: "scale(1.04)",
                                        minHeight: 540 // Make the highlighted card a bit taller
                                    }
                                    : { minHeight: 480 }
                            }
                        >
                            <div className={`card-header py-3${plan.highlight ? " text-bg-primary border-primary" : ""}`}>
                                <h4 className="my-0 fw-normal">
                                    {plan.title}
                                    {plan.highlight && (
                                        <span className="badge bg-primary ms-2 align-middle" style={{ fontSize: "0.9em" }}>
                                            Best Value
                                        </span>
                                    )}
                                </h4>
                            </div>
                            <div className="card-body d-flex flex-column">
                                <h1 className="card-title pricing-card-title">
                                    {plan.price}
                                    {plan.priceNote && (
                                        <small className="text-muted fw-light">{plan.priceNote}</small>
                                    )}
                                </h1>
                                <ul className="list-unstyled mt-3 mb-4">
                                    {plan.features.map((feature, i) => (
                                        <li key={i}>{feature}</li>
                                    ))}
                                </ul>
                                {plan.highlight && (
                                    <div className="mb-3 text-primary fw-bold" style={{ fontSize: "1.1em" }}>
                                        Most popular choice for homeowners and businesses!
                                    </div>
                                )}
                                <div className="mt-auto">
                                    {plan.link ? (
                                        <Link
                                            to={plan.link}
                                            className={`w-100 btn btn-lg btn-${plan.buttonVariant}`}
                                        >
                                            {plan.buttonLabel}
                                        </Link>
                                    ) : (
                                        <button
                                            type="button"
                                            className={`w-100 btn btn-lg btn-${plan.buttonVariant}`}
                                        >
                                            {plan.buttonLabel}
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
};