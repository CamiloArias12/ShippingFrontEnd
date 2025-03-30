import { z } from 'zod';
export declare const AuthLoginReq: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
export type AuthLoginDto = z.infer<typeof AuthLoginReq>;
export declare const AuthResDto: z.ZodObject<{
    token: z.ZodString;
}, "strip", z.ZodTypeAny, {
    token: string;
}, {
    token: string;
}>;
export type AuthResDto = z.infer<typeof AuthResDto>;
export declare const AuthCheckReq: z.ZodObject<{
    token: z.ZodString;
}, "strip", z.ZodTypeAny, {
    token: string;
}, {
    token: string;
}>;
export type AuthCheckReq = z.infer<typeof AuthCheckReq>;
