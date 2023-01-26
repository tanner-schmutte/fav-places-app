const GOOGLE_API_KEY = "key";

export function getMapPreview(lat, lng) {
    const imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=15&size=400x200&maptype=roadmap&markers=color:blue%7Clabel:S%7C${lat},${lng}&key=${GOOGLE_API_KEY}`;
    console.log("imagePreview", imagePreviewUrl);
    return imagePreviewUrl;
}
