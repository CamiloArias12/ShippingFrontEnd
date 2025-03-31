import { loginStart, loginSuccess, loginFailure, logout } from './authSlice';
import { getUserInfo, serviceCreate, serviceLogin } from '../api/auth';
import { saveToken, getToken, removeToken } from './local.storage';
import { User } from './authSlice';

/**
 * Sanitize user data to ensure only serializable and necessary values are included.
 * @param userData - The raw user data from the API.
 * @returns A sanitized User object.
 * @throws Error if the user data is invalid.
 */
const sanitizeUserData = (userData: any): User => {
    if (!userData) {
        throw new Error('Invalid user data');
    }

    return {
        id: userData.id,
        name: userData.name,
        email: userData.email,
        role: userData.role || 'user', // Default role is 'user' if not provided.
    };
};

/**
 * Initialize authentication by restoring the session from a saved token.
 * If the token is invalid or the user data cannot be retrieved, the session is cleared.
 */
export const initializeAuth = () => async (dispatch: any) => {
    const token = getToken(); // Retrieve the token from local storage.

    if (!token) {
        return; // Exit if no token is found.
    }

    try {
        dispatch(loginStart()); // Set the loading state.

        const userResponse = await getUserInfo(); // Fetch user info using the token.
        if (!userResponse || !userResponse.data) {
            removeToken(); // Clear the token if user data cannot be retrieved.
            dispatch(logout()); // Log out the user.
            return;
        }

        const sanitizedUserData = sanitizeUserData(userResponse.data); // Sanitize the user data.

        dispatch(loginSuccess({
            token,
            user: sanitizedUserData, // Save the sanitized user data in the store.
        }));
    } catch (error) {
        console.error('Failed to restore session:', error);
        removeToken(); // Clear the invalid token.
        dispatch(logout()); // Log out the user.
    }
};

/**
 * Log in a user with the provided email and password.
 * If successful, the token and user data are saved in the store.
 * @param email - The user's email.
 * @param password - The user's password.
 * @returns An object indicating success or failure, and an error message if applicable.
 */
export const loginUser = (email: string, password: string) => async (dispatch: any) => {
    try {
        dispatch(loginStart()); // Set the loading state.
        const response = await serviceLogin({
            email,
            password,
        }); 

        if (!response || !response.token) {
            throw new Error('Invalid response from server'); 
        }
        saveToken(response.token); 
        dispatch(loginSuccess({
            token: response.token,
            user:{
                role:'user',
            } , 
            }));

        return { success: true }; 
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Login failed';
        dispatch(loginFailure(errorMessage)); 
        return { success: false, error: errorMessage };
    }
};

/**
 * Log out the user by clearing the token and resetting the authentication state.
 */
export const logoutUser = () => (dispatch: any) => {
    removeToken(); // Clear the token from local storage.
    dispatch(logout()); // Reset the authentication state in the store.
};