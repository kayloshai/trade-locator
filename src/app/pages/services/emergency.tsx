import React from "react";

interface EmergencyService {
    id: string;
    name: string;
    description: string;
    image: string;
    available: boolean;
    eta: string;
}

const emergencyServices: EmergencyService[] = [
    {
        id: "plumbing",
        name: "Emergency Plumbing",
        description: "Burst pipes, leaks, or blocked drains? Get a plumber to your door fast.",
        image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
        available: true,
        eta: "20-30 min",
    },
    {
        id: "electrical",
        name: "Emergency Electrical",
        description: "Power outage or exposed wires? Certified electricians available 24/7.",
        image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
        available: true,
        eta: "25-40 min",
    },
    {
        id: "masonry",
        name: "Emergency Masonry",
        description: "Wall collapse or structural cracks? Skilled masons on call.",
        image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80",
        available: false,
        eta: "Unavailable",
    },
    {
        id: "carpentry",
        name: "Emergency Carpentry",
        description: "Broken doors, windows, or urgent repairs? Carpenters ready to help.",
        image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80",
        available: true,
        eta: "30-45 min",
    },
    {
        id: "garden",
        name: "Emergency Garden",
        description: "Storm damage or fallen trees? Gardeners available for urgent needs.",
        image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
        available: true,
        eta: "40-60 min",
    },
    {
        id: "engineering",
        name: "Emergency Engineering",
        description: "Urgent inspections or structural issues? Engineers on standby.",
        image: "https://images.unsplash.com/photo-1503389152951-9c3d8b6e9c94?auto=format&fit=crop&w=400&q=80",
        available: false,
        eta: "Unavailable",
    },
];

export const Emergency = ({ className }: { className?: string }) => {
    return (
        <div className={`container py-5 ${className || ""}`} id="emergency-page">
            <h1 className="mb-4 text-center">Emergency Services</h1>
            <div className="row g-4">
                {emergencyServices.map(service => (
                    <div className="col-12 col-md-6 col-lg-4" key={service.id}>
                        <div className="card h-100 shadow-sm">
                            <img
                                src={service.image}
                                alt={service.name}
                                className="card-img-top"
                                style={{ height: 180, objectFit: "cover" }}
                            />
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title">{service.name}</h5>
                                <p className="card-text flex-grow-1">{service.description}</p>
                                <div className="d-flex justify-content-between align-items-center">
                                    <span className={`badge ${service.available ? "bg-success" : "bg-secondary"}`}>
                                        {service.available ? `ETA: ${service.eta}` : "Unavailable"}
                                    </span>
                                    <button
                                        className="btn btn-primary"
                                        disabled={!service.available}
                                    >
                                        {service.available ? "Request Now" : "Unavailable"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};