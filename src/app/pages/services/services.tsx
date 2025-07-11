import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useLocationContext } from "../../context/LocationContext";
import { getDistanceFromLatLonInKm, estimateEtaMinutes, getDrivingDistance } from "../../functions/functions";
import { useJsApiLoader } from "@react-google-maps/api";

interface Services {
    id: string;
    name: string;
    description: string;
    image: string;
    available: boolean;
    eta: string;
    reviews?: {
        score: number;
        count: number;
    };
    location?: {
        lastKnownLocation: { lat: number; lon: number };
        currentLocation: { lat: number; lon: number };
    };
}

// South African major city centres
const cityLocations = [
    { name: "Johannesburg", lat: -26.2041, lon: 28.0473 },
    { name: "Cape Town", lat: -33.9249, lon: 18.4241 },
    { name: "Durban", lat: -29.8587, lon: 31.0218 },
    { name: "Pretoria", lat: -25.7479, lon: 28.2293 },
    { name: "Port Elizabeth", lat: -33.9608, lon: 25.6022 },
    { name: "Bloemfontein", lat: -29.0852, lon: 26.1596 }
];

// Helper to pick a random city location
function randomCity() {
    return cityLocations[Math.floor(Math.random() * cityLocations.length)];
}

// Helper to add a small random offset to lat/lon
function randomNearby(base: { lat: number; lon: number }) {
    return {
        lat: base.lat + (Math.random() - 0.5) * 0.1,
        lon: base.lon + (Math.random() - 0.5) * 0.1,
    };
}

const services: Services[] = [
    {
        id: "plumbing",
        name: "Emergency Plumbing",
        description: "Burst pipes, leaks, or blocked drains? Get a plumber to your door fast.",
        image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
        available: true,
        eta: "20-30 min",
        reviews: { score: 4.8, count: 134 },
        location: (() => {
            const city = randomCity();
            return {
                lastKnownLocation: randomNearby(city),
                currentLocation: randomNearby(city)
            };
        })()
    },
    {
        id: "plumbing",
        name: "Toilet Overflow",
        description: "Overflowing or clogged toilet? Rapid response for urgent repairs.",
        image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
        available: true,
        eta: "25-35 min",
        reviews: { score: 4.7, count: 98 },
        location: (() => {
            const city = randomCity();
            return {
                lastKnownLocation: randomNearby(city),
                currentLocation: randomNearby(city)
            };
        })()
    },
    {
        id: "electrical",
        name: "Emergency Electrical",
        description: "Power outage or exposed wires? Certified electricians available 24/7.",
        image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
        available: true,
        eta: "25-40 min",
        reviews: { score: 4.9, count: 210 },
        location: (() => {
            const city = randomCity();
            return {
                lastKnownLocation: randomNearby(city),
                currentLocation: randomNearby(city)
            };
        })()
    },
    {
        id: "electrical",
        name: "Circuit Breaker Failure",
        description: "Breaker tripped or panel issues? Get safe, fast help now.",
        image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80",
        available: true,
        eta: "30-45 min",
        reviews: { score: 4.6, count: 75 },
        location: (() => {
            const city = randomCity();
            return {
                lastKnownLocation: randomNearby(city),
                currentLocation: randomNearby(city)
            };
        })()
    },
    {
        id: "masonry",
        name: "Emergency Masonry",
        description: "Wall collapse or structural cracks? Skilled masons on call.",
        image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80",
        available: false,
        eta: "Unavailable",
        reviews: { score: 4.5, count: 32 },
        location: (() => {
            const city = randomCity();
            return {
                lastKnownLocation: randomNearby(city),
                currentLocation: randomNearby(city)
            };
        })()
    },
    {
        id: "masonry",
        name: "Falling Bricks",
        description: "Loose or falling bricks? Prevent further damage with urgent repairs.",
        image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80",
        available: true,
        eta: "40-60 min",
        reviews: { score: 4.7, count: 41 },
        location: (() => {
            const city = randomCity();
            return {
                lastKnownLocation: randomNearby(city),
                currentLocation: randomNearby(city)
            };
        })()
    },
    {
        id: "carpentry",
        name: "Emergency Carpentry",
        description: "Broken doors, windows, or urgent repairs? Carpenters ready to help.",
        image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80",
        available: true,
        eta: "30-45 min",
        reviews: { score: 4.8, count: 88 },
        location: (() => {
            const city = randomCity();
            return {
                lastKnownLocation: randomNearby(city),
                currentLocation: randomNearby(city)
            };
        })()
    },
    {
        id: "carpentry",
        name: "Board Up Service",
        description: "Broken window or door? Secure your property quickly.",
        image: "https://images.unsplash.com/photo-1503389152951-9c3d8b6e9c94?auto=format&fit=crop&w=400&q=80",
        available: true,
        eta: "35-50 min",
        reviews: { score: 4.6, count: 54 },
        location: (() => {
            const city = randomCity();
            return {
                lastKnownLocation: randomNearby(city),
                currentLocation: randomNearby(city)
            };
        })()
    },
    {
        id: "garden",
        name: "Emergency Garden",
        description: "Storm damage or fallen trees? Gardeners available for urgent needs.",
        image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
        available: true,
        eta: "40-60 min",
        reviews: { score: 4.7, count: 61 },
        location: (() => {
            const city = randomCity();
            return {
                lastKnownLocation: randomNearby(city),
                currentLocation: randomNearby(city)
            };
        })()
    },
    {
        id: "garden",
        name: "Flooded Garden",
        description: "Flooding or drainage issues? Get help restoring your garden.",
        image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
        available: false,
        eta: "Unavailable",
        reviews: { score: 4.4, count: 19 },
        location: (() => {
            const city = randomCity();
            return {
                lastKnownLocation: randomNearby(city),
                currentLocation: randomNearby(city)
            };
        })()
    },
    {
        id: "engineering",
        name: "Emergency Engineering",
        description: "Urgent inspections or structural issues? Engineers on standby.",
        image: "https://images.unsplash.com/photo-1503389152951-9c3d8b6e9c94?auto=format&fit=crop&w=400&q=80",
        available: false,
        eta: "Unavailable",
        reviews: { score: 4.5, count: 12 },
        location: (() => {
            const city = randomCity();
            return {
                lastKnownLocation: randomNearby(city),
                currentLocation: randomNearby(city)
            };
        })()
    },
    {
        id: "engineering",
        name: "Structural Assessment",
        description: "Immediate assessment for building safety after damage or disaster.",
        image: "https://images.unsplash.com/photo-1503389152951-9c3d8b6e9c94?auto=format&fit=crop&w=400&q=80",
        available: true,
        eta: "60-90 min",
        reviews: { score: 4.9, count: 27 },
        location: (() => {
            const city = randomCity();
            return {
                lastKnownLocation: randomNearby(city),
                currentLocation: randomNearby(city)
            };
        })()
    },
];

// Helper to format ETA in hrs:mins
function formatEta(minutes: number) {
    const hrs = Math.floor(minutes / 60);
    const mins = Math.round(minutes % 60);
    return hrs > 0 ? `${hrs}h ${mins}m` : `${mins}m`;
}

export const Services = ({ className }: { className?: string }) => {
    const location = useLocation();
    const { location: userLocation } = useLocationContext();
    const [view, setView] = useState<"grid" | "list">("grid");
    const [search, setSearch] = useState("");
    const [liveData, setLiveData] = useState<Record<number, { eta: string; distance: string }>>({});

    // Load Google Maps JS API before using getDrivingDistance
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string,
        libraries: ["places"],
    });

    const fromPage = location.state?.fromPage as string | undefined;
    const pathToId: Record<string, string> = {
        "/plumbing": "plumbing",
        "/carpentry": "carpentry",
        "/masonry": "masonry",
        "/electrical": "electrical",
        "/garden": "garden",
        "/engineering": "engineering",
    };
    const filterId = fromPage && pathToId[fromPage] ? pathToId[fromPage] : null;

    // Filter by type and then by search
    const filteredServices = (filterId
        ? services.filter(service => service.id === filterId)
        : services
    ).filter(service =>
        service.name.toLowerCase().includes(search.trim().toLowerCase())
    );

    // Calculate distance and ETA for each service (sync fallback)
    const servicesWithDistance = filteredServices.map((service, idx) => {
        if (!userLocation || !service.location) return { ...service, distance: null, etaMins: null };
        const distance = getDistanceFromLatLonInKm(
            userLocation.lat,
            userLocation.lng,
            service.location.lastKnownLocation.lat,
            service.location.lastKnownLocation.lon
        );
        const etaMins = estimateEtaMinutes(distance);
        return { ...service, distance, etaMins };
    });

    // Fetch live ETA/distance for visible services
    useEffect(() => {
        if (!userLocation || !isLoaded) return;
        filteredServices.forEach((service, idx) => {
            if (
                !service.available ||
                !service.location ||
                liveData[idx] // already fetched
            ) {
                return;
            }
            getDrivingDistance(
                userLocation.lat,
                userLocation.lng,
                service.location.lastKnownLocation.lat,
                service.location.lastKnownLocation.lon
            )
                .then(result => {
                    setLiveData(prev => ({
                        ...prev,
                        [idx]: {
                            eta: result.durationText,
                            distance: result.distanceText,
                        }
                    }));
                })
                .catch(() => {
                    // fallback: do nothing, will use static estimate
                });
        });
        // eslint-disable-next-line
    }, [userLocation, filteredServices, isLoaded]);

    if (!isLoaded) return <div>Loading map data...</div>;

    return (
        <div className={`container py-5 ${className || ""}`} id="emergency-page">
            <h1 className="mb-4 text-center">Services</h1>
            <div className="mb-4">
                <div className="d-flex flex-column flex-md-row align-items-center justify-content-between mb-2">
                    <div className="d-flex align-items-center flex-grow-1" style={{ minWidth: 0 }}>
                        {/* Search Bar */}
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search services..."
                            style={{ maxWidth: 260, minWidth: 0 }}
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />
                        {/* Optional: Add a small gap between search and label */}
                        {filterId && <span style={{ width: 16 }} />}
                        {filterId && (
                            <span className="ms-0 ms-md-3 alert alert-info mb-0 py-1 px-2">
                                Showing all<strong>{filterId.charAt(0).toUpperCase() + filterId.slice(1)} </strong>
                            </span>
                        )}
                    </div>
                    <span className="mt-3 mt-md-0 ms-md-3">
                        <button
                            type="button"
                            className={`btn btn-outline-primary me-2${view === "grid" ? " active" : ""}`}
                            onClick={() => setView("grid")}
                            aria-label="Grid View"
                            style={{ display: "inline-flex", alignItems: "center", justifyContent: "center" }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-grid" viewBox="0 0 16 16">
                                <path d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5zM2.5 2a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5zm6.5.5A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5zM1 10.5A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5zm6.5.5A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5z" />
                            </svg>
                        </button>
                        <button
                            type="button"
                            className={`btn btn-outline-primary${view === "list" ? " active" : ""}`}
                            onClick={() => setView("list")}
                            aria-label="List View"
                            style={{ display: "inline-flex", alignItems: "center", justifyContent: "center" }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5" />
                            </svg>
                        </button>
                    </span>
                </div>
            </div>
            {/* Grid or List View */}
            {view === "grid" ? (
                <div className="row g-4">
                    {servicesWithDistance.map((service, idx) => (
                        <div className="col-12 col-md-6 col-lg-4" key={service.id + idx}>
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
                                    <div className="mb-2">
                                        {service.reviews && (
                                            <span className="text-warning" title={`${service.reviews.score} stars`}>
                                                <svg width="16" height="16" fill="currentColor" style={{ marginRight: 2, marginBottom: 2 }} viewBox="0 0 16 16">
                                                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.32-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.63.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                                                </svg>
                                                {service.reviews.score} <span className="text-muted" style={{ fontSize: "0.95em" }}>({service.reviews.count})</span>
                                            </span>
                                        )}
                                    </div>
                                    <div className="d-flex justify-content-between align-items-center mb-2">
                                        {service.available && (
                                            <>
                                                <span className="badge bg-success">
                                                    ETA: {liveData[idx]?.eta || (service.etaMins !== null ? formatEta(service.etaMins) : service.eta)}
                                                </span>
                                                {liveData[idx]?.distance && (
                                                    <span className="badge bg-info text-dark ms-2">
                                                        {liveData[idx].distance}
                                                    </span>
                                                )}
                                                {!liveData[idx]?.distance && service.distance !== null && (
                                                    <span className="badge bg-info text-dark ms-2">
                                                        {service.distance.toFixed(1)} km
                                                    </span>
                                                )}
                                            </>
                                        )}
                                    </div>
                                    <button
                                        className="btn btn-primary mt-auto"
                                        disabled={!service.available}
                                    >
                                        {service.available ? "Request Now" : "Unavailable"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="list-group">
                    {servicesWithDistance.map((service, idx) => (
                        <div className="list-group-item list-group-item-action mb-3" key={service.id + idx}>
                            <div className="d-flex align-items-center">
                                <img
                                    src={service.image}
                                    alt={service.name}
                                    style={{ width: 80, height: 80, objectFit: "cover", borderRadius: 8, marginRight: 20 }}
                                />
                                <div className="flex-grow-1">
                                    <h5 className="mb-1">{service.name}</h5>
                                    <p className="mb-1">{service.description}</p>
                                    {service.reviews && (
                                        <span className="text-warning" title={`${service.reviews.score} stars`}>
                                            <svg width="16" height="16" fill="currentColor" style={{ marginRight: 2, marginBottom: 2 }} viewBox="0 0 16 16">
                                                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.32-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.63.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                                            </svg>
                                            {service.reviews.score} <span className="text-muted" style={{ fontSize: "0.95em" }}>({service.reviews.count})</span>
                                        </span>
                                    )}
                                    <div>
                                        {service.available && (
                                            <>
                                                <span className="badge bg-success ms-1">
                                                    ETA: {liveData[idx]?.eta || (service.etaMins !== null ? formatEta(service.etaMins) : service.eta)}
                                                </span>
                                                {liveData[idx]?.distance && (
                                                    <span className="badge bg-info text-dark ms-2">
                                                        {liveData[idx].distance}
                                                    </span>
                                                )}
                                                {!liveData[idx]?.distance && service.distance !== null && (
                                                    <span className="badge bg-info text-dark ms-2">
                                                        {service.distance.toFixed(1)} km
                                                    </span>
                                                )}
                                            </>
                                        )}
                                    </div>
                                </div>
                                <button
                                    className="btn btn-primary ms-3"
                                    disabled={!service.available}
                                >
                                    {service.available ? "Request Now" : "Unavailable"}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};