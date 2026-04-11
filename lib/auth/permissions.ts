import { createAccessControl } from "better-auth/plugins/access";
import { defaultStatements } from "better-auth/plugins/admin/access";

/**
 * Access control for the admin plugin.
 * `defaultStatements` contains the built-in user/session permissions.
 */
const statement = {
  ...defaultStatements,
} as const;

export const ac = createAccessControl(statement);

/** Admin — can manage users and sessions */
export const adminRole = ac.newRole({
  user: [
    "create",
    "list",
    "set-role",
    "ban",
    "impersonate",
    "delete",
    "set-password",
    "get",
    "update",
  ],
  session: ["list", "revoke", "delete"],
});

/** Superadmin — full control including impersonating other admins */
export const superAdminRole = ac.newRole({
  user: [
    "create",
    "list",
    "set-role",
    "ban",
    "impersonate",
    "impersonate-admins",
    "delete",
    "set-password",
    "get",
    "update",
  ],
  session: ["list", "revoke", "delete"],
});
