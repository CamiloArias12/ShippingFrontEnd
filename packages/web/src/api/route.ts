import { api, getAuthHeaders } from ".";

export async function serviceFindRoutes(): Promise<any | null> {
    const data= await api.get("/routes", {}, { headers: getAuthHeaders() });
    return data.data;
}