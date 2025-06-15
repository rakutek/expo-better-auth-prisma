import { expoClient } from "@better-auth/expo/client";
import { inferAdditionalFields } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import * as SecureStore from "expo-secure-store";

export const authClient = createAuthClient({
	baseURL:
		process.env.EXPO_PUBLIC_API_BASE_URL ||
		"http://localhost:8787",
	plugins: [
		expoClient({
			scheme: "myapp",
			storagePrefix: "rakuri",
			storage: SecureStore,
		}),
		inferAdditionalFields({
			user: {
				isOnboarded: {
					type: "boolean",
				},
			},
		}),
	],
});

export const { useSession } = authClient;

export const signInWithGoogle = async (callbackURL = "/dashboard") => {
	return await authClient.signIn.social({
		provider: "google",
		callbackURL,
	});
};

export const signInWithGoogleIdToken = async (
	idToken: string,
	nonce?: string,
	callbackURL = "/dashboard"
) => {
	return await authClient.signIn.social({
		provider: "google",
		idToken: {
			token: idToken,
			nonce,
		},
		callbackURL,
	});
};
