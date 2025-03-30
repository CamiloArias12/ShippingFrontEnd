import { z } from 'zod';
import { UserRole } from '../enums';
import { Driver } from '..';
export declare const UserCreateReq: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodEffects<z.ZodString, string, string>;
    password: z.ZodEffects<z.ZodEffects<z.ZodEffects<z.ZodEffects<z.ZodString, string, string>, string, string>, string, string>, string, string>;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
    name: string;
}, {
    email: string;
    password: string;
    name: string;
}>;
export type UserCreateDto = z.infer<typeof UserCreateReq>;
export type User = {
    id?: number;
    name: string;
    email: string;
    password: string;
    role?: UserRole;
    driver: Driver;
    created_at?: Date;
    updated_at?: Date;
    deleted_at?: Date;
};
