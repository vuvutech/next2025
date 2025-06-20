import { createAccessControl } from "better-auth/plugins/access";

const statement = {
    user: ["ban"],
    listing: ["create", "view", "update", "delete"],
} as const;

export const ac = createAccessControl(statement);

export const publicRole = ac.newRole({
    listing: ["view"],
});

export const realtorRole = ac.newRole({
    listing: ["create", "view", "update"],
});

export const adminRole = ac.newRole({
    user: ["ban"],
    listing: ["create", "view", "update", "delete"],
});