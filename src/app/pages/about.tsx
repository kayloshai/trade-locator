interface Props {
    className?: string;
}

export const About = ({ className }: Props) => {
    return (
        <main className={`container py-5 ${className || ""}`} id="about-page">
            <h1 className="mb-4 text-center">About Us</h1>
            <p className="lead text-center mb-4">
                We provide world-class services at your fingertips, bringing comfort and convenience to your home.
            </p>
            <div className="text-center">
                <div
                    style={{
                        width: 120,
                        height: 120,
                        background: "#e9ecef",
                        borderRadius: "50%",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "2rem",
                        color: "#6c757d",
                        marginBottom: "1rem"
                    }}
                    aria-label="Team photo placeholder"
                >
                    <span>Our Team</span>
                </div>
            </div>
            <section className="mx-auto" style={{ maxWidth: 600 }}>
                <p>
                    At Trade Locator, our mission is to connect you with trusted professionals for all your home and business needs.
                    Whether you need plumbing, carpentry, masonry, or engineering services, our platform makes it easy to find and book the right expert.
                </p>
                <p>
                    We are committed to quality, transparency, and customer satisfaction. Thank you for choosing us!
                </p>
            </section>
        </main>
    );
}