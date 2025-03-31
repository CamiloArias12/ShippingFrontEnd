import { z } from 'zod';
import { ShipmentStatus } from '../enums';
import { User } from '../user';
import { Driver, Route } from '..';
export declare const ShipmentCreateReq: z.ZodObject<{
    weight: z.ZodNumber;
    dimensions: z.ZodString;
    product_type: z.ZodString;
    destination: z.ZodString;
    location: z.ZodOptional<z.ZodObject<{
        lat: z.ZodOptional<z.ZodNumber>;
        lng: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        lat?: number | undefined;
        lng?: number | undefined;
    }, {
        lat?: number | undefined;
        lng?: number | undefined;
    }>>;
}, "strict", z.ZodTypeAny, {
    weight: number;
    dimensions: string;
    product_type: string;
    destination: string;
    location?: {
        lat?: number | undefined;
        lng?: number | undefined;
    } | undefined;
}, {
    weight: number;
    dimensions: string;
    product_type: string;
    destination: string;
    location?: {
        lat?: number | undefined;
        lng?: number | undefined;
    } | undefined;
}>;
export type ShipmentCreateDto = z.infer<typeof ShipmentCreateReq>;
export declare const AssignShipmentReq: z.ZodObject<{
    id: z.ZodString;
    driverId: z.ZodNumber;
    routeId: z.ZodNumber;
}, "strict", z.ZodTypeAny, {
    id: string;
    driverId: number;
    routeId: number;
}, {
    id: string;
    driverId: number;
    routeId: number;
}>;
export type AssignShipmentDto = z.infer<typeof AssignShipmentReq>;
export declare const ShipmentUpdateStatusReq: z.ZodObject<{
    id: z.ZodString;
    status: z.ZodNativeEnum<typeof ShipmentStatus>;
}, "strict", z.ZodTypeAny, {
    status: ShipmentStatus;
    id: string;
}, {
    status: ShipmentStatus;
    id: string;
}>;
export type ShipmentUpdateStatusDtoReq = z.infer<typeof ShipmentUpdateStatusReq>;
export declare const ShipmentUpdateStatusDto: z.ZodObject<z.objectUtil.extendShape<{
    id: z.ZodString;
    status: z.ZodNativeEnum<typeof ShipmentStatus>;
}, {
    userId: z.ZodNumber;
}>, "strict", z.ZodTypeAny, {
    status: ShipmentStatus;
    id: string;
    userId: number;
}, {
    status: ShipmentStatus;
    id: string;
    userId: number;
}>;
export type ShipmentUpdateStatusDto = z.infer<typeof ShipmentUpdateStatusDto>;
export type Shipment = {
    id?: string;
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
    user?: User;
    driver?: Driver;
    route?: Route;
    route_id?: number;
    created_at?: Date;
    updated_at?: Date;
    deleted_at?: Date;
};
export type ShipmentStatusHistory = {
    id?: string;
    shipment_id: number;
    previous_status?: ShipmentStatus;
    new_status: ShipmentStatus;
    changed_by_user_id?: number;
    changed_at?: Date;
    created_at?: Date;
    updated_at?: Date;
    deleted_at?: Date;
};
