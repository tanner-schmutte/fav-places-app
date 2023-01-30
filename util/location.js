const GOOGLE_API_KEY = "AIzaSyBAE9Cx6xyHmAdj72yTa9zlrtoHQrUh6ek";

export function getMapPreview(lat, lng) {
    const imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=15&size=400x200&maptype=roadmap&markers=color:blue%7Clabel:S%7C${lat},${lng}&key=${GOOGLE_API_KEY}`;
    return imagePreviewUrl;
}

export async function getAddress(lat, lng) {
    const res = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_API_KEY}`
    );

    if (!res.ok) {
        throw new Error("Failed to fetch address.");
    }

    const data = await res.json();
    const address = data.results[0].formatted_address;

    return address;
}
