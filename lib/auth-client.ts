// lib/auth-client.ts
import { createAuthClient } from "better-auth/react";
import {
	organizationClient,
	twoFactorClient,
	adminClient,
	multiSessionClient,
	oneTapClient,
	genericOAuthClient,
	emailOTPClient,
} from "better-auth/client/plugins";
import { toast } from "sonner";
import { baseUrl } from "./metadata";
import { ac, adminRole, superAdminRole } from "./auth/permissions";

export const client = createAuthClient({
	baseURL: `${baseUrl}` || "http://localhost:3000",
	plugins: [
		emailOTPClient(),
		organizationClient(),
		twoFactorClient({
			onTwoFactorRedirect() {
				window.location.href = "/auth/two-factor";
			},
		}),

		adminClient({
			ac,
			roles: {
				ADMIN: adminRole,
				SUPERADMIN: superAdminRole,
			},
		}),
		multiSessionClient(),
		oneTapClient({
			clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
		}),
		// oidcClient(),
		genericOAuthClient(),
	],
	fetchOptions: {
		onError(e) {
			if (e.error.status === 429) {
				toast.error("Too many requests. Please try again later.");
			}
		},
	},
});

export const {
  admin,
  signUp,
  signIn,
  signOut,
  resetPassword,
  verifyEmail,
  getSession,
  useSession,
  organization,
  useListOrganizations,
  useActiveOrganization,
} = client;