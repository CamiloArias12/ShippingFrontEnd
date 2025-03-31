/**
 * Decodes a Google Maps encoded polyline string into an array of latitude/longitude points.
 * @param {string} encoded - The encoded polyline string.
 * @returns {Array<{ lat: number, lng: number }>} - Array of decoded points with latitude and longitude.
 */
export function decodePolyline(encoded: string) {
  let points = []; // Array to store decoded points.
  let index = 0;   // Position within the encoded string.
  let len = encoded.length; // Length of the encoded string.
  let lat = 0;     // Accumulated latitude value.
  let lng = 0;     // Accumulated longitude value.

  // Loop through each character in the encoded string
  while (index < len) {
    let b, shift = 0, result = 0;

    // Decode latitude component
    do {
      // Convert ASCII character to binary value, adjust by -63 to get the original value.
      b = encoded.charCodeAt(index++) - 63;
      // Isolate the lower 5 bits of `b` and add it to `result` at the current shift position.
      result |= (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 0x20); // Continue while the 6th bit of `b` is set (indicates continuation).
    
    // Apply a bitwise check to determine if the result is negative, then shift to get actual delta value.
    const deltaLat = ((result & 1) ? ~(result >> 1) : (result >> 1));
    lat += deltaLat; // Update accumulated latitude.

    // Reset shift and result for the next component (longitude)
    shift = 0;
    result = 0;

    // Decode longitude component
    do {
      // Convert ASCII character to binary value and adjust by -63.
      b = encoded.charCodeAt(index++) - 63;
      // Isolate the lower 5 bits and add it to `result` at the current shift position.
      result |= (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 0x20); // Continue if the 6th bit of `b` is set.
    
    // Apply a bitwise check to determine if the result is negative, then shift to get actual delta value.
    const deltaLng = ((result & 1) ? ~(result >> 1) : (result >> 1));
    lng += deltaLng; // Update accumulated longitude.

    // Convert latitude and longitude back to float values and add the point to the list
    points.push({ lat: lat / 1e5, lng: lng / 1e5 });
  }

  return points; // Return array of decoded points.
}