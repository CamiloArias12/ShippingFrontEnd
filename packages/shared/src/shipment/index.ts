import { z } from 'zod';
import { ShipmentStatus } from '../enums';
import { User } from '../user';
import { Driver, Route } from '..';

export const ShipmentCreateReq = z.object({
    weight: z.number({ message: "weight.required" }).positive(),
    dimensions: z.string({ message: "dimensions.required" }).nonempty(),
    product_type: z.string({ message: "product_type.required" }).nonempty(),
    destination: z.string({ message: "destination.required" }).nonempty(),
    location: z.object({
        lat: z.number({ message: "latitude.required" }).optional(),
        lng:z.number({ message: "longitude.required" }).optional(),
    }).optional(),
}).strict();

export type ShipmentCreateDto = z.infer<typeof ShipmentCreateReq>;

export const AssignShipmentReq = z.object({
    id: z.string({ message: "shipment.required" }),
    driverId: z.number({ message: "driver.required" }).nonnegative(),
    routeId: z.number({ message: "route.required" }).nonnegative(),
}).strict();

export type AssignShipmentDto = z.infer<typeof AssignShipmentReq>;


export const ShipmentUpdateStatusReq = z.object({
    id: z.string({ message: "shipment.required" }),
    status: z.nativeEnum(ShipmentStatus, { message: "status.required" })
}).strict();

export type ShipmentUpdateStatusDtoReq = z.infer<typeof ShipmentUpdateStatusReq>;

export const ShipmentUpdateStatusDto = ShipmentUpdateStatusReq.extend({
    userId: z.number({ message: "user.required" }).nonnegative(),
});

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
}

export type ShipmentStatusHistory ={
    id?: string;
    shipment_id: number;
    previous_status?: ShipmentStatus;
    new_status: ShipmentStatus;
    changed_by_user_id?: number;
    changed_at?: Date;
    created_at?: Date;
    updated_at?: Date;
    deleted_at?: Date;
}