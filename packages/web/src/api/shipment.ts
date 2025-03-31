import { ShipmentCreateDto, Shipment, ShipmentStatusHistory, ShipmentUpdateStatusDto, ShipmentUpdateStatusDtoReq, AssignShipmentDto } from "@shipping/shared/shipment";
import { api, getAuthHeaders } from ".";

export async function serviceCreateShipment(req: ShipmentCreateDto): Promise<Shipment | null> {
    return await api.post("/shipments", req, { headers: getAuthHeaders() });
}

export async function serviceUpdateShipment(id: string, req: any): Promise<Shipment | null> {
    return await api.put(`/shipments/${id}`, req, { headers: getAuthHeaders() });
}
export async function serviceUpdateShipmentStatus(req: ShipmentUpdateStatusDtoReq): Promise<Shipment | null> {
    return await api.put(`/shipments/status`, req, { headers: getAuthHeaders() });
}
export async function serviceUpdateShipmentAssign(req: AssignShipmentDto): Promise<Shipment | null> {
    return await api.put(`/shipments/assign`, req, { headers: getAuthHeaders() });
}

export async function serviceFindShipments(): Promise<Shipment[] | null> {
    const data = await api.get("/shipments", {}, { headers: getAuthHeaders() });
    return data.data;
}
export async function serviceFindAllShipments(): Promise<Shipment[] | null> {
    const data = await api.get("/shipments/all/users", {}, { headers: getAuthHeaders() });
    return data.data;
}

export async function serviceFindShipmentById(id: string): Promise<Shipment | null> {
    const data = await api.get(`/shipments/${id}`, [],{ headers: getAuthHeaders() });
    return data.data;
}

export async function serviceFindShipmentHistory(id: string): Promise<ShipmentStatusHistory[] | null> {
    return await api.get(`/shipments/${id}/history`, { headers: getAuthHeaders() });
}

export async function serviceFilters(filters:any): Promise<any | null> {
    return await api.get(`/shipments/metrics/data`, filters,{ headers: getAuthHeaders() });
}