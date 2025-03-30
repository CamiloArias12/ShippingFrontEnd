import { AuthLoginDto } from "@shipping/shared/auth";
import { UserCreateDto } from "@shipping/shared/user";
import {ApiClient} from "@shipping/shared/api/api-service";

const api = new ApiClient("http://localhost:8000");

export async function serviceLogin(req: AuthLoginDto): Promise<any | null> {
    return await api.post("/user/login", req);
}
export async function serviceCreate(req: UserCreateDto): Promise<any | null> {
    return await api.post("/user", req);
}

