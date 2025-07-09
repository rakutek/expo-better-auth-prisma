import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { authClient } from "@/lib/auth-client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const queryClient = new QueryClient();

export default function RootLayout() {
	const { data: session, isPending } = authClient.useSession();
	const isAuthenticated = !!(session && session.user && session.user.id);

	if (isPending) {
		// Async font loading only occurs in development.
		return null;
	}

	return (
		<QueryClientProvider client={queryClient}>
			<SafeAreaProvider>
				<SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }} edges={["top", "left", "right"]}>
					<Stack>
						<Stack.Protected guard={isAuthenticated}>
							<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
						</Stack.Protected>
						<Stack.Screen name="loginPage" options={{ headerShown: false }} />
					</Stack>
				</SafeAreaView>

				<StatusBar style="dark" />
			</SafeAreaProvider>
		</QueryClientProvider>
	);
}
