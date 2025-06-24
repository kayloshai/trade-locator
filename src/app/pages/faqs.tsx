import { useState } from "react";

interface Props {
    className?: string;
}

export const FAQs = ({ className }: Props) => {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <main className={`container py-5 ${className || ""}`} id="faqs-page">
            <h1 className="mb-4 text-center" id="faqs-title">Frequently Asked Questions</h1>
            <p className="lead text-center mb-5">
                Have questions? We're here to help! Check back soon for answers to our most common questions.
            </p>
            <div className="d-flex justify-content-center mb-4">
                <div className="card shadow-sm" style={{ maxWidth: 500 }}>
                    <div className="card-body text-center">
                        <h2 className="card-title h5">No FAQs available yet</h2>
                        <p className="card-text">If you have a question, please contact our support team or use the form below.</p>
                    </div>
                </div>
            </div>
            <div className="d-flex justify-content-center">
                <form
                    className="w-100"
                    style={{ maxWidth: 500 }}
                    onSubmit={handleSubmit}
                    aria-labelledby="faq-form-title"
                >
                    <h2 className="mb-3 text-center h5" id="faq-form-title">Submit a Question</h2>
                    <div className="mb-3">
                        <label htmlFor="faq-name" className="form-label">Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="faq-name"
                            placeholder="Your name"
                            required
                            disabled={submitted}
                            autoComplete="name"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="faq-email" className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            id="faq-email"
                            placeholder="Your email"
                            required
                            disabled={submitted}
                            autoComplete="email"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="faq-question" className="form-label">Your Question</label>
                        <textarea
                            className="form-control"
                            id="faq-question"
                            rows={3}
                            placeholder="Type your question here..."
                            required
                            disabled={submitted}
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        className="btn btn-primary w-100"
                        disabled={submitted}
                        aria-disabled={submitted}
                    >
                        {submitted ? "Submitted" : "Submit Question"}
                    </button>
                    <div
                        className="mt-3"
                        aria-live="polite"
                        aria-atomic="true"
                    >
                        {submitted && (
                            <div className="alert alert-success" role="alert">
                                Thank you! Your question has been submitted.
                            </div>
                        )}
                    </div>
                </form>
            </div>
        </main>
    );
}