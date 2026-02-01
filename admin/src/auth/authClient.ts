import { createAuthClient } from "better-auth/react";
import { inferAdditionalFields } from "better-auth/client/plugins";
import { AUTH_BASE_URL } from "@/lib/config";

export const authClient = createAuthClient({
  baseURL: AUTH_BASE_URL,
  plugins: [
    inferAdditionalFields({
      user: {
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
    }),
  ],
});

export const { signIn, signUp, signOut, useSession } = authClient;
