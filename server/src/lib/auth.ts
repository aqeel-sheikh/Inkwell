import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "@/config/prisma";
import "dotenv/config";
import { createAuthMiddleware } from "better-auth/api";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },
  trustedOrigins: [
    process.env.ADMIN_FRONTEND_URL!,
    process.env.CLIENT_FRONTEND_URL!,
  ],
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
