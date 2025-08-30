import { Role } from "./admin";


export type AllAdmins = {
    id: number;
    name: string;
    email: string;
    phone: string;
    addressLine: string;
    nationalId: string;
    status: string;
    role: Role;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    image: string | null;
    roleId: number;
};