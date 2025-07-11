import { expo } from "@better-auth/expo";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import type { PrismaClient } from "../../prisma/generated/prisma/client";

export const auth = (prisma: PrismaClient) =>
	betterAuth({
		database: prismaAdapter(prisma, {
			provider: "postgresql",
		}),
		user: {
			additionalFields: {
				isOnboarded: {
					type: "boolean",
					required: false,
					default: false,
				},
			},
		},
		trustedOrigins: [
			"rakuri://",
			process.env.APP_ORIGIN || "http://localhost:3000",
			"https://appleid.apple.com",
		],
		emailAndPassword: {
			enabled: true,
		},
		plugins: [expo()],
		socialProviders: {
			google: {
				clientId: process.env.GOOGLE_CLIENT_ID as string,
				clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
			},
			apple: {
				clientId: process.env.APPLE_CLIENT_ID as string,
				clientSecret: process.env.APPLE_CLIENT_SECRET as string,
				appBundleIdentifier: "ai.rakuri.rakuri",
			},
		},
	});
