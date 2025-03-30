"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserCreateReq = void 0;
const zod_1 = require("zod");
const validator_1 = __importDefault(require("validator"));
exports.UserCreateReq = zod_1.z.object({
    name: zod_1.z.string().min(1, { message: "name.required" }).max(50, { message: "name.maxLen" }),
    email: zod_1.z.string().email({ message: "email.invalid" }).refine((value) => validator_1.default.isEmail(value), { message: "email.invalid" }),
    password: zod_1.z.string()
        .min(8, { message: "password.len" })
        .max(20, { message: "password.maxLen" })
        .refine((value) => /[A-Z]/.test(value), { message: "password.uppercase" })
        .refine((value) => /[a-z]/.test(value), { message: "password.lowercase" })
        .refine((value) => /[0-9]/.test(value), { message: "password.number" })
        .refine((value) => /[@$!%*?&#]/.test(value), { message: "password.specialChar" }),
});
