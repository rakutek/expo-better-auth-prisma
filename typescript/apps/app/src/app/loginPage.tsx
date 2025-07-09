import { Stack } from "expo-router";
import { useState } from "react";
import { Alert, Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { authClient } from "../lib/auth-client";

const { width } = Dimensions.get("window");

export default function LoginScreen() {
	const [isLoading, setIsLoading] = useState(false);

	const login = async () => {
		try {
			setIsLoading(true);
			await authClient.signIn.social({
				provider: "google",
				callbackURL: "rakuri://",
			});
		} catch (error) {
			console.error("Login error:", error);
			Alert.alert("ログインエラー", "ログインに失敗しました。もう一度お試しください。", [
				{ text: "OK" },
			]);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<>
			<Stack.Screen options={{ title: "ログイン", headerShown: false }} />

			<View style={styles.container}>
				<View style={styles.content}>
					{/* App Logo/Icon */}
					<View style={styles.logoContainer}>
						<Text style={styles.logoText}>R</Text>
					</View>

					{/* Welcome Text */}
					<View style={styles.welcomeSection}>
						<Text style={styles.welcomeTitle}>おかえりなさい</Text>
						<Text style={styles.welcomeSubtitle}>アカウントにログインして続行してください</Text>
					</View>

					{/* Login Button */}
					<TouchableOpacity
						style={[styles.loginButton, { opacity: isLoading ? 0.5 : 1 }]}
						onPress={login}
						disabled={isLoading}
						activeOpacity={0.8}
					>
						<View style={styles.googleIcon}>
							<Text style={styles.googleIconText}>G</Text>
						</View>
						<Text style={styles.loginButtonText}>
							{isLoading ? "ログイン中..." : "Googleでログイン"}
						</Text>
					</TouchableOpacity>

					{/* Additional Info */}
					<Text style={styles.termsText}>
						ログインすることで、利用規約とプライバシーポリシーに同意したものとみなされます
					</Text>
				</View>

				{/* Footer */}
				<View style={styles.footer}>
					<Text style={styles.footerText}>初回利用の方も同じボタンからアカウント作成できます</Text>
				</View>
			</View>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#E3F2FD",
		paddingHorizontal: 16,
	},
	content: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		paddingHorizontal: 16,
	},
	logoContainer: {
		width: 96,
		height: 96,
		backgroundColor: "#1976D2",
		borderRadius: 48,
		justifyContent: "center",
		alignItems: "center",
		marginBottom: 48,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.1,
		shadowRadius: 8,
		elevation: 4,
	},
	logoText: {
		color: "white",
		fontSize: 32,
		fontWeight: "bold",
	},
	welcomeSection: {
		alignItems: "center",
		marginBottom: 48,
	},
	welcomeTitle: {
		fontSize: 28,
		fontWeight: "bold",
		color: "#1A1A1A",
		textAlign: "center",
		marginBottom: 8,
	},
	welcomeSubtitle: {
		fontSize: 18,
		color: "#666",
		textAlign: "center",
		maxWidth: 300,
		lineHeight: 24,
	},
	loginButton: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "white",
		paddingVertical: 16,
		paddingHorizontal: 24,
		borderRadius: 12,
		minWidth: Math.min(280, width - 64),
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 2,
		borderWidth: 1,
		borderColor: "#E0E0E0",
		marginBottom: 32,
	},
	googleIcon: {
		width: 24,
		height: 24,
		backgroundColor: "#DB4437",
		borderRadius: 12,
		justifyContent: "center",
		alignItems: "center",
		marginRight: 12,
	},
	googleIconText: {
		color: "white",
		fontSize: 12,
		fontWeight: "bold",
	},
	loginButtonText: {
		flex: 1,
		fontSize: 16,
		fontWeight: "600",
		color: "#1A1A1A",
		textAlign: "center",
	},
	termsText: {
		fontSize: 12,
		color: "#888",
		textAlign: "center",
		maxWidth: 320,
		lineHeight: 16,
	},
	footer: {
		paddingBottom: 48,
		paddingHorizontal: 16,
	},
	footerText: {
		fontSize: 12,
		color: "#999",
		textAlign: "center",
	},
});
