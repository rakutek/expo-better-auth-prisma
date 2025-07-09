import type { AppType } from "api/src/index";
import { hc } from "hono/client";
import { authClient } from "./auth-client";
import Constants from "expo-constants";
import { Platform } from "react-native";

const baseUrl = process.env.EXPO_PUBLIC_API_BASE_URL || "http://localhost:8787/";

// Create a factory function that returns a fresh client with the latest cookies
export const getClient = () => {
	const cookies = authClient.getCookie();

	const headers = {
		Cookie: cookies,
		"X-Timezone": Intl.DateTimeFormat().resolvedOptions().timeZone || "Asia/Tokyo",
	};

	return hc<AppType>(baseUrl, {
		headers,
	});
};


// This will always have the latest cookies when accessed
export const client = new Proxy({} as ReturnType<typeof hc<AppType>>, {
	get: (target, prop) => {
		// Always get a fresh client when any property is accessed
		const freshClient = getClient();
		return freshClient[prop as keyof typeof freshClient];
	},
});