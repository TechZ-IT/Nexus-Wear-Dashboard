import { Admin, Role } from "./admin";


export type AllAdmins = {
    data: Admin[]
    total: number
    page: number
    limit: number
};