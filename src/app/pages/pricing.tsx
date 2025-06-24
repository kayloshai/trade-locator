import { Link } from "react-router-dom";

interface Props {
    className?: string;
}

export const Pricing = ({ className }: Props) => {
    return (
        <main className={`container py-5 ${className || ""}`} id="pricing-page">
            <h1 className="mb-4 text-center">Pricing</h1>
            <p className="lead text-center mb-5">
                Transparent and competitive pricing for all our services. Please contact us for a custom quote or check back soon for updated pricing information.
            </p>
            <section aria-labelledby="pricing-table-title" className="mx-auto" style={{ maxWidth: 600 }}>
                <h2 id="pricing-table-title" className="h5 mb-3 text-center">Services</h2>
                <table className="table table-bordered table-striped" aria-describedby="pricing-table-desc">
                    <caption id="pricing-table-desc" className="visually-hidden">
                        List of available services. Pricing will be published soon.
                    </caption>
                    <thead className="table-dark">
                        <tr>
                            <th scope="col">Service</th>
                            <th scope="col">Pricing</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Plumbing</td>
                            <td>Contact us for pricing</td>
                        </tr>
                        <tr>
                            <td>Carpentry</td>
                            <td>Contact us for pricing</td>
                        </tr>
                        <tr>
                            <td>Masonry</td>
                            <td>Contact us for pricing</td>
                        </tr>
                        <tr>
                            <td>Engineering Consultation</td>
                            <td>Contact us for pricing</td>
                        </tr>
                    </tbody>
                </table>
            </section>
            <div className="text-center mt-4">
                <Link to="/quote" className="btn btn-primary" aria-label="Request a custom quote">
                    Request a Custom Quote
                </Link>
            </div>
        </main>
    );
}