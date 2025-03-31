import { AuthLoginDto } from "@shipping/shared/auth";
import { UserCreateDto } from "@shipping/shared/user";
import { api, getAuthHeaders } from ".";

/**
 * Logs in a user by sending their credentials to the backend.
 * @param req - The login request object containing email and password.
 * @returns A promise resolving to the login response or null.
 */
export async function serviceLogin(req: AuthLoginDto): Promise<any | null> {
    return await api.post("/user/login", req);
}

/**
 * Creates a new user by sending their details to the backend.
 * @param req - The user creation request object.
 * @returns A promise resolving to the creation response or null.
 */
export async function serviceCreate(req: UserCreateDto): Promise<any | null> {
    return await api.post("/user", req);
}

/**
 * Fetches the current user's information using the stored token.
 * @returns A promise resolving to the user information or null.
 */
export async function getUserInfo(): Promise<any | null> {
    return await api.get("/user", undefined, { headers: getAuthHeaders() });
}
