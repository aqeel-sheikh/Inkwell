import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "@/config/prisma";
import "dotenv/config";

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
});
