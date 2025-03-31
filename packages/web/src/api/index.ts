import { ApiClient } from "@shipping/shared/api/api-service";
import { getToken } from "../store/local.storage";

const API_CLIENT= import.meta.env.VITE_API_URL || "http://localhost:8000";
/**
 * Initializes the API client with the base URL for the backend.
 */
export const api = new ApiClient(API_CLIENT);

/**
 * Retrieves the authorization headers for authenticated API requests.
 * @returns An object containing the Authorization header with the Bearer token.
 * @throws An error if no token is found.
 */
export const getAuthHeaders = () => {
    const token = getToken();
    if (!token) {
        throw new Error("No token found");
    }
    return { Authorization: `Bearer ${token}` };
};