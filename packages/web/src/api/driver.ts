import { Driver } from "@shipping/shared/index";
import { api, getAuthHeaders } from ".";

export async function serviceFindDrivers(): Promise<Driver[] | null> {
    const data= await api.get("/drivers", {}, { headers: getAuthHeaders() });
    return data.data;
}