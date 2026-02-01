import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "@/config/prisma";
import { createAuthMiddleware } from "better-auth/api";
import "dotenv/config";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  baseURL: process.env.BETTER_AUTH_BASE_URL,
  emailAndPassword: {
    enabled: true,
  },
  trustedOrigins: [
    process.env.ADMIN_FRONTEND_URL!,
    process.env.CLIENT_FRONTEND_URL!,
  ],
  advanced:{
    defaultCookieAttributes: {
      sameSite: "none",
      secure: true,
      partitioned: true,
    },
  },
  user: {
    additionalFields: {
      username: {
        type: "string",
        required: true,
        unique: true,
      },
      website: {
        type: "string",
        required: false,
      },
      bio: {
        type: "string",
        required: false,
      },
      coverImage: {
        type: "string",
        required: false,
      },
    },
  },
  hooks: {
    before: createAuthMiddleware(async (ctx) => {
      if (ctx.path === "/sign-up/email") {
        return {
          context: {
            ...ctx,
            body: {
              ...ctx.body,
              username: ctx.body.username.toLowerCase(),
            },
          },
        };
      }
    }),
  },
});
