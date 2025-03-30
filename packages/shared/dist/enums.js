"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRole = exports.ShipmentStatus = exports.DriverStatus = void 0;
var DriverStatus;
(function (DriverStatus) {
    DriverStatus["AVAILABLE"] = "available";
    DriverStatus["BUSY"] = "busy";
    DriverStatus["OFFLINE"] = "offline";
})(DriverStatus || (exports.DriverStatus = DriverStatus = {}));
var ShipmentStatus;
(function (ShipmentStatus) {
    ShipmentStatus["PENDING"] = "pending";
    ShipmentStatus["IN_TRANSIT"] = "in_transit";
    ShipmentStatus["DELIVERED"] = "delivered";
    ShipmentStatus["CANCELLED"] = "cancelled";
})(ShipmentStatus || (exports.ShipmentStatus = ShipmentStatus = {}));
var UserRole;
(function (UserRole) {
    UserRole["ADMIN"] = "admin";
    UserRole["USER"] = "user";
    UserRole["DRIVER"] = "driver";
})(UserRole || (exports.UserRole = UserRole = {}));
