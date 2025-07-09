import { Colors } from "@/constants/Colors";
import { authClient } from "@/lib/auth-client";
import { Alert, Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

export default function SettingsScreen() {
	const { data: session, isPending } = authClient.useSession();

	const handleSignOut = async () => {
		try {
			await authClient.signOut();
		} catch (error) {
			Alert.alert("Error", "Failed to sign out");
		}
	};

	if (isPending) {
		return (
			<View style={[styles.container, { backgroundColor: Colors.background }]}>
				<Text style={[styles.loadingText, { color: Colors.text }]}>Loading...</Text>
			</View>
		);
	}

	if (!session) {
		return (
			<View style={[styles.container, { backgroundColor: Colors.background }]}>
				<Text style={[styles.errorText, { color: Colors.text }]}>No user session found</Text>
			</View>
		);
	}

	return (
		<ScrollView style={[styles.container, { backgroundColor: Colors.background }]}>
			<View style={styles.content}>
				<Text style={[styles.title, { color: Colors.text }]}>Settings</Text>

				<View style={[styles.section, { backgroundColor: Colors.background }]}>
					<Text style={[styles.sectionTitle, { color: Colors.text }]}>User Information</Text>

					<View style={[styles.userInfoContainer, { backgroundColor: Colors.background }]}>
						{session.user.image && (
							<View style={styles.avatarContainer}>
								<Image source={{ uri: session.user.image }} style={styles.avatar} />
							</View>
						)}

						<View style={styles.userInfoRow}>
							<Text style={[styles.label, { color: Colors.text }]}>Name:</Text>
							<Text style={[styles.value, { color: Colors.text }]}>
								{session.user.name || "N/A"}
							</Text>
						</View>

						<View style={styles.userInfoRow}>
							<Text style={[styles.label, { color: Colors.text }]}>Email:</Text>
							<Text style={[styles.value, { color: Colors.text }]}>
								{session.user.email || "N/A"}
							</Text>
						</View>

						<View style={styles.userInfoRow}>
							<Text style={[styles.label, { color: Colors.text }]}>User ID:</Text>
							<Text style={[styles.value, { color: Colors.text }]}>{session.user.id || "N/A"}</Text>
						</View>
					</View>
				</View>

				<View style={[styles.signOutContainer, { backgroundColor: Colors.background }]}>
					<Pressable style={styles.signOutButton} onPress={handleSignOut}>
						<Text style={styles.signOutText}>Sign Out</Text>
					</Pressable>
				</View>
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	content: {
		paddingHorizontal: 16,
	},
	title: {
		fontSize: 28,
		fontWeight: "bold",
		marginBottom: 24,
	},
	section: {
		marginBottom: 24,
	},
	sectionTitle: {
		fontSize: 20,
		fontWeight: "600",
		marginBottom: 12,
	},
	userInfoContainer: {
		padding: 16,
		borderRadius: 8,
		borderWidth: 1,
		borderColor: "#E0E0E0",
	},
	userInfoRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingVertical: 8,
		borderBottomWidth: 1,
		borderBottomColor: "#F0F0F0",
	},
	label: {
		fontSize: 16,
		fontWeight: "500",
		flex: 1,
	},
	value: {
		fontSize: 16,
		flex: 2,
		textAlign: "right",
	},
	loadingText: {
		fontSize: 18,
		textAlign: "center",
		marginTop: 100,
	},
	errorText: {
		fontSize: 18,
		textAlign: "center",
		marginTop: 100,
		color: "#FF3B30",
	},
	avatarContainer: {
		alignItems: "center",
		marginBottom: 20,
	},
	avatar: {
		width: 80,
		height: 80,
		borderRadius: 40,
		borderWidth: 2,
		borderColor: "#E0E0E0",
	},
	signOutContainer: {
		marginTop: 32,
		alignItems: "center",
	},
	signOutButton: {
		backgroundColor: "#FF3B30",
		paddingHorizontal: 24,
		paddingVertical: 12,
		borderRadius: 8,
	},
	signOutText: {
		color: "#FFFFFF",
		fontWeight: "bold",
	},
});
