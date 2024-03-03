import { Role } from "../entities/roles/roleModel";

export const UserRoles = {
    SUPER_ADMIN: { id: 1, role_name: "super_admin" } as Role,
    ADMIN: { id: 2, role_name: "admin" } as Role,
    USER: { id: 3, role_name: "user" } as Role,
};