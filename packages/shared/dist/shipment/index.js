"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShipmentUpdateStatusDto = exports.ShipmentUpdateStatusReq = exports.AssignShipmentReq = exports.ShipmentCreateReq = void 0;
const zod_1 = require("zod");
const enums_1 = require("../enums");
exports.ShipmentCreateReq = zod_1.z.object({
    weight: zod_1.z.number({ message: "weight.required" }).positive(),
    dimensions: zod_1.z.string({ message: "dimensions.required" }).nonempty(),
    product_type: zod_1.z.string({ message: "product_type.required" }).nonempty(),
    destination: zod_1.z.string({ message: "destination.required" }).nonempty(),
    location: zod_1.z.object({
        lat: zod_1.z.number({ message: "latitude.required" }).optional(),
        lng: zod_1.z.number({ message: "longitude.required" }).optional(),
    }).optional(),
}).strict();
exports.AssignShipmentReq = zod_1.z.object({
    id: zod_1.z.string({ message: "shipment.required" }),
    driverId: zod_1.z.number({ message: "driver.required" }).nonnegative(),
    routeId: zod_1.z.number({ message: "route.required" }).nonnegative(),
}).strict();
exports.ShipmentUpdateStatusReq = zod_1.z.object({
    id: zod_1.z.string({ message: "shipment.required" }),
    status: zod_1.z.nativeEnum(enums_1.ShipmentStatus, { message: "status.required" })
}).strict();
exports.ShipmentUpdateStatusDto = exports.ShipmentUpdateStatusReq.extend({
    userId: zod_1.z.number({ message: "user.required" }).nonnegative(),
});
