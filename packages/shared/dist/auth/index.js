"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthCheckReq = exports.AuthResDto = exports.AuthLoginReq = void 0;
const zod_1 = require("zod");
exports.AuthLoginReq = zod_1.z.object({
    email: zod_1.z
        .string()
        .email({ message: "validation.email.email" })
        .nonempty("validation.email.nonempty"),
    password: zod_1.z.string().min(8, { message: "password.email.len" }).max(255),
});
exports.AuthResDto = zod_1.z.object({
    token: zod_1.z.string(),
});
exports.AuthCheckReq = zod_1.z.object({
    token: zod_1.z.string(),
});
