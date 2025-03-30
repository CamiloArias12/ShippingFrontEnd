import { ApiClient } from "../../../../../ShippingBackend/packages/shared/dist/api/api-service"
import { AuthLoginDto,AuthResDto } from '../../../../../ShippingBackend/packages/shared/dist/auth'
import { UserCreateDto } from '../../../../../ShippingBackend/packages/shared/dist/user'

const api = new ApiClient("http://localhost:8000");

export async function serviceLogin(req: AuthLoginDto): Promise<AuthResDto | null> {
    return await api.post("/user/login", req);
}
export async function serviceCreate(req: UserCreateDto): Promise<AuthResDto | null> {
    return await api.post("/user", req);
}

