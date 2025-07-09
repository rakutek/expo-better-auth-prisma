import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { Link, Stack, useRouter } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

export default function DemoSecondScreen() {
	const router = useRouter();

	const demoFeatures = [
		{
			icon: "star",
			title: "Advanced Features",
			description: "This is the second demo page with more advanced functionality",
		},
		{
			icon: "layers",
			title: "Multi-level Navigation",
			description: "Demonstrates nested navigation patterns in React Native",
		},
		{
			icon: "settings",
			title: "Complex UI Components",
			description: "Shows how to build more sophisticated user interfaces",
		},
	];

	return (
		<>
			<Stack.Screen
				options={{
					title: "Second Demo",
				}}
			/>
			<ScrollView style={[styles.container, { backgroundColor: Colors.background }]}>
				<View style={styles.content}>
					<View style={styles.header}>
						<Ionicons name="layers" size={48} color={Colors.tint} />
						<Text style={[styles.title, { color: Colors.text }]}>Second Demo Page</Text>
						<Text style={[styles.subtitle, { color: Colors.text }]}>
							Advanced navigation and UI patterns
						</Text>
					</View>

					<View style={styles.section}>
						<Text style={[styles.sectionTitle, { color: Colors.text }]}>Navigation Flow</Text>
						<Text style={[styles.description, { color: Colors.text }]}>
							You've successfully navigated from Home → Demo Detail → Second Demo. This demonstrates
							how Stack navigation can handle multiple levels of navigation.
						</Text>
					</View>

					<View style={styles.section}>
						<Text style={[styles.sectionTitle, { color: Colors.text }]}>Features</Text>
						{demoFeatures.map((feature, index) => (
							<View key={index} style={styles.featureCard}>
								<View style={styles.featureHeader}>
									<Ionicons name={feature.icon as any} size={24} color={Colors.tint} />
									<Text style={[styles.featureTitle, { color: Colors.text }]}>{feature.title}</Text>
								</View>
								<Text style={[styles.featureDescription, { color: Colors.text }]}>
									{feature.description}
								</Text>
							</View>
						))}
					</View>

					<View style={styles.section}>
						<Text style={[styles.sectionTitle, { color: Colors.text }]}>Interactive Elements</Text>
						<View style={styles.interactiveContainer}>
							<Pressable style={styles.interactiveButton}>
								<Ionicons name="heart" size={20} color="#fff" />
								<Text style={styles.interactiveButtonText}>Like</Text>
							</Pressable>
							<Pressable style={[styles.interactiveButton, { backgroundColor: "#FF6B6B" }]}>
								<Ionicons name="share" size={20} color="#fff" />
								<Text style={styles.interactiveButtonText}>Share</Text>
							</Pressable>
							<Pressable style={[styles.interactiveButton, { backgroundColor: "#4ECDC4" }]}>
								<Ionicons name="bookmark" size={20} color="#fff" />
								<Text style={styles.interactiveButtonText}>Save</Text>
							</Pressable>
						</View>
					</View>

					<View style={styles.navigationButtons}>
						<Pressable style={[styles.navButton, styles.backButton]} onPress={() => router.back()}>
							<Ionicons name="arrow-back" size={20} color="#fff" />
							<Text style={styles.navButtonText}>Back to Demo Detail</Text>
						</Pressable>

						<Link href="/(tabs)" asChild>
							<Pressable style={[styles.navButton, styles.homeButton]}>
								<Ionicons name="home" size={20} color="#fff" />
								<Text style={styles.navButtonText}>Back to Home</Text>
							</Pressable>
						</Link>
					</View>
				</View>
			</ScrollView>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	content: {
		paddingVertical: 20,
		paddingHorizontal: 16,
	},
	header: {
		alignItems: "center",
		marginBottom: 30,
		paddingTop: 20,
	},
	title: {
		fontSize: 28,
		fontWeight: "bold",
		marginTop: 16,
		textAlign: "center",
	},
	subtitle: {
		fontSize: 16,
		textAlign: "center",
		marginTop: 8,
		opacity: 0.7,
	},
	section: {
		marginBottom: 24,
	},
	sectionTitle: {
		fontSize: 20,
		fontWeight: "600",
		marginBottom: 12,
	},
	description: {
		fontSize: 16,
		lineHeight: 24,
	},
	featureCard: {
		backgroundColor: "#f8f9fa",
		padding: 16,
		borderRadius: 8,
		marginBottom: 12,
		borderWidth: 1,
		borderColor: "#e9ecef",
	},
	featureHeader: {
		flexDirection: "row",
		alignItems: "center",
		gap: 12,
		marginBottom: 8,
	},
	featureTitle: {
		fontSize: 16,
		fontWeight: "600",
	},
	featureDescription: {
		fontSize: 14,
		lineHeight: 20,
		opacity: 0.8,
	},
	interactiveContainer: {
		flexDirection: "row",
		gap: 12,
		flexWrap: "wrap",
	},
	interactiveButton: {
		backgroundColor: Colors.tint,
		flexDirection: "row",
		alignItems: "center",
		paddingVertical: 8,
		paddingHorizontal: 16,
		borderRadius: 20,
		gap: 6,
	},
	interactiveButtonText: {
		color: "#fff",
		fontSize: 14,
		fontWeight: "600",
	},
	navigationButtons: {
		gap: 12,
		marginTop: 20,
	},
	navButton: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		paddingVertical: 12,
		paddingHorizontal: 24,
		borderRadius: 8,
		gap: 8,
	},
	backButton: {
		backgroundColor: Colors.tint,
	},
	homeButton: {
		backgroundColor: "#34C759",
	},
	navButtonText: {
		color: "#fff",
		fontSize: 16,
		fontWeight: "600",
	},
});
