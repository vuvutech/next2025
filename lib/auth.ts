import { betterAuth } from "better-auth";
import {
  bearer,
  admin,
  multiSession,
  organization,
  twoFactor,
  oAuthProxy,
  openAPI,
  oidcProvider,
  emailOTP,
} from "better-auth/plugins";
import { reactInvitationEmail } from "./email/invitation";
import { reactResetPasswordEmail } from "./email/rest-password";
import { resend } from "./email/resend";
import { nextCookies } from "better-auth/next-js";
import { baseUrl } from "./metadata";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "@/prisma/dbConnect";

const from = process.env.BETTER_AUTH_EMAIL || "notifications@costrad.org";
const to = process.env.TEST_EMAIL || "";



export const auth = betterAuth({
  appName: "College of Sustainable Transformation and Development",

  database: prismaAdapter(prisma, {
    provider: "mongodb",
  }),

  // hooks: {
  //   before: createAuthMiddleware(async (ctx) => {
  //     if (ctx.path === "/sign-in/email") {
  //       if (ctx.body?.email) {
  //         const user = await prisma.user.findUnique({
  //           where: { email: ctx.body.email },
  //         });
  //         if (!user) {
  //           throw new APIError("BAD_REQUEST", {
  //             message: "User not found",
  //             status: 404,
  //           });
  //         }
  //         if (user.emailVerified === false) {
  //           throw new APIError("FORBIDDEN", {
  //             message: "Email not verified",
  //             status: 403,
  //           });
  //         }
  //       }
  //     }
  //   }),
  // },

  onAPIError: {
    throw: true,
    onError: (error, ctx) => {
      console.error("Auth error:", error);
    },
    errorURL: "/auth/error",
  },

  baseUrl: baseUrl,

  emailVerification: {
    autoSignInAfterVerification: true,
    sendOnSignUp: true,
    async sendVerificationEmail({ user, url }) {
      const res = await resend.emails.send({
        from,
        to: user.email,
        subject: "Verify your email address",
        html: `<a href="${url}">Verify your email address</a>`,
      });
    },
  },
  rateLimit: {
    enabled: true,
    max: 100,
    duration: 60,
  },
  trustedOrigins: [
    "http://localhost:3000",
    "https://costrad.org",
    "https://scholars-endangered-gzip-powerful.trycloudflare.com",
  ],

  account: {
    accountLinking: {
      enabled: true,
      trustedProviders: ["google", "facebook", "microsoft", "linkedin"],
    },
  },
  emailAndPassword: {
    autoSignIn: false,
    enabled: true,
    requireEmailVerification: true,
    minPasswordLength: 8,
    async sendResetPassword({ user, url }) {
      await resend.emails.send({
        from: "no-reply@costrad.org",
        to: user.email,
        subject: "Reset your COSTrAD password",
        react: reactResetPasswordEmail({
          username: user.email,
          resetLink: url,
        }),
      });
    },
  },
  socialProviders: {
    google: {
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    },
    microsoft: {
      clientId: process.env.MICROSOFT_CLIENT_ID || "",
      clientSecret: process.env.MICROSOFT_CLIENT_SECRET || "",
    },
  },
  plugins: [
    emailOTP({
      async sendVerificationOTP({ email, otp, type = "sign-in" }) {
        await resend.emails.send({
          from,
          to: email,
          subject: "Your Login OTP",
          html: `<p>Hello,</p>
                 <p>Your One-Time Password (OTP) is: <strong>${otp}</strong></p>
                 <p>This OTP is valid for 10 minutes.</p>
                 <p>If you did not request this, please ignore this email.</p>`,
        });
      },
    }),
    organization({
      async sendInvitationEmail(data) {
        await resend.emails.send({
          from,
          to: data.email,
          subject: "You've been invited to join an organization",
          react: reactInvitationEmail({
            username: data.email,
            invitedByUsername: data.inviter.user.name,
            invitedByEmail: data.inviter.user.email,
            teamName: data.organization.name,
            inviteLink:
              process.env.NODE_ENV === "development"
                ? `http://localhost:3000/accept-invitation/${data.id}`
                : `${process.env.BETTER_AUTH_URL}/accept-invitation/${data.id}`,
          }),
        });
      },
    }),
    twoFactor({
      otpOptions: {
        async sendOTP({ user, otp }) {
          await resend.emails.send({
            from,
            to: user.email,
            subject: "Your OTP",
            html: `Your OTP is ${otp}`,
          });
        },
      },
    }),
    openAPI(),
    bearer(),
    admin(),
    multiSession(),
    oAuthProxy(),
    oidcProvider({
      loginPage: "/auth/sign-in",
    }),
    nextCookies(),
  ],
});