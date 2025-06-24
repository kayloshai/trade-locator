interface Props {
    className?: string;
}

export const PlaceholderQuote = ({ className }: Props) => {

    return (
        <div className={`container py-5 ${className || ""}`} id="quote-page">
            <h1 className="mb-4 text-center">Instant Quote</h1>
            <p className="lead text-center mb-5">
                Get a fast, free quote for your next project. This is a placeholder page—quote functionality coming soon!
            </p>
            <div className="d-flex justify-content-center">
                <div className="card shadow-sm" style={{ maxWidth: 400 }}>
                    <div className="card-body text-center">
                        <h5 className="card-title">No quote available yet</h5>
                        <p className="card-text">Please check back later or contact us for more information.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}