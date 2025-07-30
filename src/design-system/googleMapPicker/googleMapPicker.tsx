// Place this in a component, e.g., GoogleMapPicker.tsx

import { useState, useCallback, useEffect } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import type { Libraries } from "@react-google-maps/api";
import { useLocationContext } from "../../app/context/LocationContext";

const containerStyle = { width: "100%", height: "400px" };
const defaultCenter = { lat: -33.8688, lng: 151.2093 }; // Default to Sydney
const libraries: Libraries = ['places', 'geometry'];
const apiKey: string = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string;

export default function GoogleMapPicker({
    onLocationSelect,
}: {
    onLocationSelect: (lat: number, lng: number) => void;
}) {
    const { location: userLocation } = useLocationContext();

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: apiKey,
        libraries
    });

    // Use user location as initial marker/center if available
    const [marker, setMarker] = useState<{ lat: number; lng: number } | null>(null);

    useEffect(() => {
        if (userLocation && !marker) {
            setMarker({ lat: userLocation.lat, lng: userLocation.lng });
            onLocationSelect(userLocation.lat, userLocation.lng);
        }
        // eslint-disable-next-line
    }, [userLocation]);

    const onMapClick = useCallback(
        (e: google.maps.MapMouseEvent) => {
            if (e.latLng) {
                const lat = e.latLng.lat();
                const lng = e.latLng.lng();
                setMarker({ lat, lng });
                onLocationSelect(lat, lng);
            }
        },
        [onLocationSelect]
    );

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={marker || userLocation || defaultCenter}
            zoom={marker || userLocation ? 16 : 12}
            onClick={onMapClick}
        >
            {/* TODO: Migrate to AdvancedMarkerElement when supported by @react-google-maps/api */}
            {marker && <Marker position={marker} />}
        </GoogleMap>
    ) : (
        <div>Loading...</div>
    );
}