import { ApiClient } from "@shipping/shared/api/api-service";
import { ShipmentCreateDto, Shipment } from "@shipping/shared/shipment";
import { getToken } from "../store/local.storage";

const api = new ApiClient("http://localhost:8000");


export const getAuthHeaders = () => {
    const token = getToken();
    return token ? { Authorization: `Bearer ${token}` } : { Authorization: `Bearer }` };
};

export async function serviceCreateShipment(req: ShipmentCreateDto): Promise<Shipment | null> {
    return await api.post("/shipments", req, { headers: getAuthHeaders() });
}

export async function serviceUpdateShipment(id: string, req: any): Promise<Shipment | null> {
    return await api.put(`/shipments/${id}`, req, { headers: getAuthHeaders() });
}

export async function serviceFindShipments(): Promise<Shipment[] | null> {
    const data = await api.get("/shipments", {}, { headers: getAuthHeaders() });
    return data.data;
}

export async function serviceFindShipmentById(id: string): Promise<Shipment | null> {
    const data = await api.get(`/shipments/${id}`, { headers: getAuthHeaders() });
    return data.data;
}

export async function serviceFindShipmentHistory(id: string): Promise<ShipmentHistory[] | null> {
    return await api.get(`/shipments/${id}/history`, { headers: getAuthHeaders() });
}


// New service for real-time updates
export async function serviceSubscribeToShipmentUpdates(id: string, callback: (data: Shipment) => void): Promise<() => void> {
    // This is a placeholder for WebSocket or SSE implementation
    // In a real implementation, you would connect to a WebSocket here
    const intervalId = setInterval(async () => {
        const shipment = await serviceFindShipmentById(id);
        if (shipment) {
            callback(shipment);
        }
    }, 5000); // Poll every 5 seconds

    // Return a cleanup function
    return () => clearInterval(intervalId);
}

export interface ShipmentHistory {
    id: number;
    shipment_id: number;
    status: 'pending' | 'in_transit' | 'delivered' | 'cancelled';
    location?: string;
    latitude?: number;
    longitude?: number;
    timestamp: string;
    notes?: string;
}