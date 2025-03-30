import { AxiosRequestConfig } from 'axios';
type LoggerFunction = (message: string, meta?: object) => void;
export declare class ApiClient {
    private axiosInstance;
    private logger?;
    host: string;
    constructor(host: string, logger?: LoggerFunction);
    /**
     * Log messages if logger is enabled
     * @param message - Log message
     * @param meta - Additional meta information
     */
    private log;
    /**
     * Send a GET request
     * @param path - The API path
     * @param params - Query parameters
     * @param config - Optional Axios request config
     * @returns Response data or null if request fails
     */
    get(path: string, params?: object, config?: AxiosRequestConfig): Promise<any | null>;
    /**
     * Send a POST request
     * @param path - The API path
     * @param data - The request body (JSON or FormData)
     * @param config - Optional Axios request config
     * @returns Response data or null if request fails
     */
    post(path: string, data?: object | FormData, config?: AxiosRequestConfig): Promise<any | null>;
    /**
     * Send a PUT request
     * @param path - The API path
     * @param data - The request body (JSON or FormData)
     * @param config - Optional Axios request config
     * @returns Response data or null if request fails
     */
    put(path: string, data?: object | FormData, config?: AxiosRequestConfig): Promise<any | null>;
    /**
     * Send a PATCH request
     * @param path - The API path
     * @param data - The request body (JSON or FormData)
     * @param config - Optional Axios request config
     * @returns Response data or null if request fails
     */
    patch(path: string, data?: object | FormData, config?: AxiosRequestConfig): Promise<any | null>;
    /**
     * Send a DELETE request
     * @param path - The API path
     * @param data - Optional body (JSON or FormData)
     * @param config - Optional Axios request config
     * @returns Response data or null if request fails
     */
    delete(path: string, data?: object | FormData, config?: AxiosRequestConfig): Promise<any | null>;
    /**
     * Determines if data is FormData and applies appropriate headers
     * @param data - The request body (JSON or FormData)
     * @param config - Existing Axios request config
     * @returns Updated Axios request config with headers
     */
    private applyHeadersForData;
}
export {};
