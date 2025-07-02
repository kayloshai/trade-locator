// Place this in a component, e.g., GoogleMapPicker.tsx

import React, { useState, useCallback } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

const containerStyle = { width: "100%", height: "400px" };
const center = { lat: -33.8688, lng: 151.2093 }; // Default to Sydney

export default function GoogleMapPicker({ onLocationSelect }: { onLocationSelect: (lat: number, lng: number) => void }) {
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string,
    });

    const [marker, setMarker] = useState<{ lat: number; lng: number } | null>(null);

    const onMapClick = useCallback((e: google.maps.MapMouseEvent) => {
        if (e.latLng) {
            const lat = e.latLng.lat();
            const lng = e.latLng.lng();
            setMarker({ lat, lng });
            onLocationSelect(lat, lng);
        }
    }, [onLocationSelect]);

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={marker || center}
            zoom={marker ? 16 : 12}
            onClick={onMapClick}
        >
            {marker && <Marker position={marker} />}
        </GoogleMap>
    ) : <div>Loading...</div>;
}