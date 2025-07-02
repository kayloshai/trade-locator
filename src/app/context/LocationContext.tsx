import React, { createContext, useContext, useState, useEffect } from "react";

type Location = {
    lat: number;
    lng: number;
} | null;

interface LocationContextType {
    location: Location;
    setLocation: (loc: Location) => void;
    locationError: string | null;
}

const LocationContext = createContext<LocationContextType>({
    location: null,
    setLocation: () => { },
    locationError: null,
});

export const useLocationContext = () => useContext(LocationContext);

export const LocationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [location, setLocation] = useState<Location>(null);
    const [locationError, setLocationError] = useState<string | null>(null);

    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
                    setLocationError(null);
                },
                (err) => {
                    setLocationError("Location access is required to use this app. Please enable location services in your browser.");
                    setLocation(null);
                }
            );
        } else {
            setLocationError("Geolocation is not supported in this browser.");
        }
    }, []);

    // log the current location whenever it changes
    // useEffect(() => {
    //     console.log("Current stored location:", location);
    // }, [location]);

    // Block app if location is not available
    if (locationError || !location) {
        return (
            <div style={{ minHeight: "100vh" }} className="d-flex flex-column justify-content-center align-items-center bg-light">
                <h2>Location Required</h2>
                <p>{locationError || "Waiting for location..."}</p>
                <button
                    className="btn btn-primary mt-3"
                    onClick={() => window.location.reload()}
                >
                    Retry
                </button>
            </div>
        );
    }

    return (
        <LocationContext.Provider value={{ location, setLocation, locationError }}>
            {children}
        </LocationContext.Provider>
    );
};