import type { AppType } from "api/src/index";
import Constants from "expo-constants";
import { hc } from "hono/client";
import { Platform } from "react-native";
import { authClient } from "./auth-client";
import ky from "ky";
import { router } from "expo-router";

const baseUrl = process.env.EXPO_PUBLIC_API_BASE_URL || "http://localhost:8787";

const kyapi = ky.extend({
  hooks: {
    beforeRequest: [(request) => {}],
    afterResponse: [
      (_, __, response: Response) => {
        // console.log(response);
        if (response.ok) {
          return response;
        } else if (response.status === 401) {
          throw new Error(response.statusText);
        } else if (response.status === 503) {
          router.replace("/maintenance");
        } else {
          throw new Error(response.statusText);
        }
      },
    ],
  },
});

export const client = hc<AppType>(`/`, {
	
  fetch: (input: RequestInfo | URL, requestInit?: RequestInit) => {
    return kyapi(`${baseUrl}${input}`, {
      method: requestInit?.method,
      headers: {
		Cookie: authClient.getCookie(),
		"X-Platform": Platform.OS,
		"X-Platform-Version": Platform.Version?.toString() || "unknown",
		"X-Build-Version": Constants.expoConfig?.version || "unknown",
		"X-Native-Build-Version": (Constants.expoConfig?.ios?.buildNumber || Constants.expoConfig?.android?.versionCode || "unknown").toString(),
      },
      body: requestInit?.body,
    });
  },
});

export const api = client.api;
