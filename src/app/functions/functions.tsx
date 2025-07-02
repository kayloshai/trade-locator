// Haversine formula: straight-line distance in km
function getDistanceFromLatLonInKm(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
): number {
    const R = 6371; // Radius of the earth in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
}

// Google Maps Distance Matrix API: driving/walking distance
function getDrivingDistance(
    originLat: number,
    originLng: number,
    destLat: number,
    destLng: number,
    travelMode: google.maps.TravelMode = google.maps.TravelMode.DRIVING
): Promise<{ distanceText: string; distanceValue: number; durationText: string; durationValue: number }> {
    return new Promise((resolve, reject) => {
        if (!window.google || !window.google.maps) {
            reject(new Error("Google Maps JS API not loaded"));
            return;
        }
        const service = new window.google.maps.DistanceMatrixService();
        service.getDistanceMatrix(
            {
                origins: [{ lat: originLat, lng: originLng }],
                destinations: [{ lat: destLat, lng: destLng }],
                travelMode,
            },
            (response, status) => {
                if (
                    status === "OK" &&
                    response &&
                    response.rows &&
                    response.rows[0] &&
                    response.rows[0].elements &&
                    response.rows[0].elements[0] &&
                    response.rows[0].elements[0].status === "OK"
                ) {
                    const element = response.rows[0].elements[0];
                    resolve({
                        distanceText: element.distance.text,
                        distanceValue: element.distance.value, // in meters
                        durationText: element.duration.text,
                        durationValue: element.duration.value, // in seconds
                    });
                } else {
                    reject(new Error("Distance Matrix request failed: " + status));
                }
            }
        );
    });
}

// Estimate ETA in minutes given distance in km and average speed (km/h)
function estimateEtaMinutes(distanceKm: number, speedKmh = 40): number {
    if (!distanceKm || distanceKm <= 0) return 0;
    return Math.round((distanceKm / speedKmh) * 60);
}

export { getDistanceFromLatLonInKm, getDrivingDistance, estimateEtaMinutes };