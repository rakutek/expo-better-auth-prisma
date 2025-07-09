import { Image } from "expo-image";
import { Link } from "expo-router";
import { Alert, Platform, Pressable, StyleSheet, Text, View } from "react-native";

import { Colors } from "@/constants/Colors";
import { client } from "@/lib/api-client";
import { authClient } from "@/lib/auth-client";
import { useQuery } from "@tanstack/react-query";

export default function HomeScreen() {
	const { data: session } = authClient.useSession();

	const query = useQuery({
		queryKey: ["posts"],
		queryFn: async () => {
			const res = await client.posts.$get();
			return await res.json();
		},
	});

	return (
		<View style={[styles.container, { backgroundColor: Colors.background }]}>
			<View style={[styles.titleContainer, { backgroundColor: Colors.background }]}>
				<Text style={[styles.title, { color: Colors.text }]}>{session?.user.name}</Text>
			</View>
			<Text>{query.data?.message}</Text>

			<View style={[styles.demoContainer, { backgroundColor: Colors.background }]}>
				<Link href="/demo-detail" asChild>
					<Pressable style={styles.demoButton}>
						<Text style={styles.demoButtonText}>View Demo Detail</Text>
					</Pressable>
				</Link>
			</View>
		</View>
	);
}
const HEADER_HEIGHT = 250;
const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 16,
	},
	header: {
		height: HEADER_HEIGHT,
		overflow: "hidden",
	},
	content: {
		flex: 1,
		padding: 32,
		gap: 16,
		overflow: "hidden",
	},
	titleContainer: {
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
	},
	stepContainer: {
		gap: 8,
		marginBottom: 8,
	},
	demoContainer: {
		marginTop: 16,
		alignItems: "center",
	},
	demoButton: {
		backgroundColor: "#007AFF",
		paddingHorizontal: 24,
		paddingVertical: 12,
		borderRadius: 8,
	},
	demoButtonText: {
		color: "#FFFFFF",
		fontWeight: "bold",
	},
	title: {
		fontSize: 32,
		fontWeight: "bold",
		lineHeight: 32,
	},
	subtitle: {
		fontSize: 20,
		fontWeight: "bold",
	},
});
