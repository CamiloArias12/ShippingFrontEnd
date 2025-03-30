import { z } from 'zod';
import { ShipmentStatus } from '../enums';
export declare const ShipmentCreateReq: z.ZodObject<{
    weight: z.ZodNumber;
    dimensions: z.ZodString;
    product_type: z.ZodString;
    destination: z.ZodString;
}, "strict", z.ZodTypeAny, {
    weight: number;
    dimensions: string;
    product_type: string;
    destination: string;
}, {
    weight: number;
    dimensions: string;
    product_type: string;
    destination: string;
}>;
export type ShipmentCreateDto = z.infer<typeof ShipmentCreateReq>;
export declare const AssignShipmentReq: z.ZodObject<{
    id: z.ZodNumber;
    driverId: z.ZodNumber;
    routeId: z.ZodNumber;
}, "strict", z.ZodTypeAny, {
    id: number;
    driverId: number;
    routeId: number;
}, {
    id: number;
    driverId: number;
    routeId: number;
}>;
export type AssignShipmentDto = z.infer<typeof AssignShipmentReq>;
export declare const ShipmentUpdateStatusReq: z.ZodObject<{
    id: z.ZodNumber;
    status: z.ZodNativeEnum<typeof ShipmentStatus>;
}, "strict", z.ZodTypeAny, {
    status: ShipmentStatus;
    id: number;
}, {
    status: ShipmentStatus;
    id: number;
}>;
export declare const ShipmentUpdateStatusDto: z.ZodObject<z.objectUtil.extendShape<{
    id: z.ZodNumber;
    status: z.ZodNativeEnum<typeof ShipmentStatus>;
}, {
    userId: z.ZodNumber;
}>, "strict", z.ZodTypeAny, {
    status: ShipmentStatus;
    id: number;
    userId: number;
}, {
    status: ShipmentStatus;
    id: number;
    userId: number;
}>;
export type ShipmentUpdateStatusDto = z.infer<typeof ShipmentUpdateStatusDto>;
export type Shipment = {
    id?: number;
    weight: number;
    dimensions: string;
    user_id: number;
    driver_id?: number;
    product_type: string;
    destination: string;
    latitude?: number;
    longitude?: number;
    status?: ShipmentStatus;
    shipment_status_history?: ShipmentStatusHistory[];
    route_id?: number;
    created_at?: Date;
    updated_at?: Date;
    deleted_at?: Date;
};
export type ShipmentStatusHistory = {
    id?: number;
    shipment_id: number;
    previous_status?: ShipmentStatus;
    new_status: ShipmentStatus;
    changed_by_user_id?: number;
    changed_at?: Date;
    created_at?: Date;
    updated_at?: Date;
    deleted_at?: Date;
};
