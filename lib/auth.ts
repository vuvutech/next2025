/* eslint-disable @typescript-eslint/no-unused-vars */
import { APIError, betterAuth } from "better-auth";
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
  createAuthMiddleware,
} from "better-auth/plugins";
import { createAuthClient } from "better-auth/client";
import { adminClient } from "better-auth/client/plugins";
import { reactInvitationEmail } from "./email/invitation";
import { reactResetPasswordEmail } from "./email/rest-password";
import { resend } from "./email/resend";
import { nextCookies } from "better-auth/next-js";
import { baseUrl } from "./metadata";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "@/prisma/dbConnect";
import { generateStudentId } from "@/app/actions/functions";
import { render } from "@react-email/components";
import VerifyEmail from "./email/VerifyEmail";

const from = process.env.BETTER_AUTH_EMAIL || "notifications@costrad.org";

export const auth = betterAuth({
  appName: "College of Sustainable Transformation and Development",

  database: prismaAdapter(prisma, {
    provider: "mongodb",
  }),

  user: {
    additionalFields: {
      studentId: {
        type: "string",
        unique: true,
      },
    },
  },
  
  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          const studentId = await generateStudentId();
          return {
            data: {
              ...user,
              studentId,
              role: "USER", 
            },
          };
        },
        after: async (user) => {
        //  
        },
      },
    },
   session: {
    create: {
      before: async (session) => {
        const bannedUser = await prisma.user.findUnique({
          where: { id: session.userId },
          select: { banned: true },
        });

        if (bannedUser?.banned) {
          // Returning false prevents the session from being created
          
          return false;
        }

        return { data: session };
      },
    },
  },
    account: {
      // Account hooks
    },
    verification: {
      // Verification hooks
    },
  },
  onAPIError: {
    throw: true,
    onError: (error, ctx) => {
      console.error("Auth error:", error);
    },
    errorURL: "/auth/error",
  },

  baseURL: baseUrl.toString(),

  emailVerification: {
  autoSignInAfterVerification: true,
  sendOnSignUp: true,
  async sendVerificationEmail({ user, url }) {
    await resend.emails.send({
      from,
      to: user.email,
      subject: "Confirm your COSTrAD account",
      react: VerifyEmail({
        username: user.name || user.email,
        verifyLink: url,
      }),
      // html: await render(
      //   VerifyEmail({
      //     username: user.name || user.email,
      //     verifyLink: url,
      //   })
      // ),
    });
  },
},
  rateLimit: {
    enabled: true,
    max: 100,
    duration: 60,
  },
  trustedOrigins: [
    "https://www.costrad.org",
    "https://costrad.org",
    "https://www.costrad.net",
    "https://costrad.net",
    "http://localhost:3000",
  ],

  account: {
    accountLinking: {
      enabled: true,
      trustedProviders: ["google", "facebook", "microsoft", "linkedin"],
      updateAccountOnSignIn: true,
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
    adminClient(),
    admin({
      defaultRole: "USER",
      adminRoles: ["ADMIN", "SUPERADMIN"],
      adminPaths: ["/admin", "/settings"],
      defaultBanReason: "Spamming",
      impersonationSessionDuration: 60 * 60 * 24, // 1 day
      defaultBanExpiresIn: 60 * 60 * 24 * 365, // 365 days
      bannedUserMessage: "Account suspended For Violating Our Terms of Service",
    }),
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
                ? `${baseUrl}/accept-invitation/${data.id}`
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