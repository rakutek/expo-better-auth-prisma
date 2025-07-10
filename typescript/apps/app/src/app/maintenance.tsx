import { Colors } from "@/constants/Colors"
import { Ionicons } from "@expo/vector-icons"
import { Link, Stack, useRouter } from "expo-router"
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native"

export default function MaintenanceScreen() {
    const router = useRouter()

    return (
        <>
            <Stack.Screen
                options={{
                    title: "メンテナンスページ",
                }}
            />
            <ScrollView style={[styles.container, { backgroundColor: Colors.background }]}>
                <View style={styles.content}>
                    <View style={styles.header}>
                        <Ionicons name="rocket" size={48} color={Colors.tint} />
                        <Text style={[styles.title, { color: Colors.text }]}>Demo Detail Page</Text>
                    </View>

                    <View style={styles.section}>
                        <Text style={[styles.sectionTitle, { color: Colors.text }]}>Welcome to the Demo</Text>
                        <Text style={[styles.description, { color: Colors.text }]}>
                            This is a detailed demo page that you navigated to from the home screen. It
                            demonstrates how Stack navigation works in this app.
                        </Text>
                    </View>

                    <View style={styles.section}>
                        <Text style={[styles.sectionTitle, { color: Colors.text }]}>Features</Text>
                        <View style={styles.featureItem}>
                            <Ionicons name="checkmark-circle" size={24} color={Colors.tint} />
                            <Text style={[styles.featureText, { color: Colors.text }]}>Stack Navigation</Text>
                        </View>
                        <View style={styles.featureItem}>
                            <Ionicons name="checkmark-circle" size={24} color={Colors.tint} />
                            <Text style={[styles.featureText, { color: Colors.text }]}>
                                Custom Header Styling
                            </Text>
                        </View>
                        <View style={styles.featureItem}>
                            <Ionicons name="checkmark-circle" size={24} color={Colors.tint} />
                            <Text style={[styles.featureText, { color: Colors.text }]}>Scrollable Content</Text>
                        </View>
                    </View>

                    <View style={styles.section}>
                        <Text style={[styles.sectionTitle, { color: Colors.text }]}>Navigation</Text>
                        <Text style={[styles.description, { color: Colors.text }]}>
                            You can navigate back to the home screen using the back button in the header, or by
                            pressing the button below.
                        </Text>
                    </View>

                    <Link href="/demo-second" asChild>
                        <Pressable style={styles.nextButton}>
                            <Ionicons name="arrow-forward" size={20} color="#fff" />
                            <Text style={styles.nextButtonText}>Go to Second Demo</Text>
                        </Pressable>
                    </Link>

                    <Pressable style={styles.backButton} onPress={() => router.back()}>
                        <Ionicons name="arrow-back" size={20} color="#fff" />
                        <Text style={styles.backButtonText}>Go Back to Home</Text>
                    </Pressable>
                </View>
            </ScrollView>
        </>
    )
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
    featureItem: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        marginBottom: 8,
    },
    featureText: {
        fontSize: 16,
    },
    nextButton: {
        backgroundColor: "#FF6B6B",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        marginTop: 20,
        gap: 8,
    },
    nextButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
    backButton: {
        backgroundColor: Colors.tint,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        marginTop: 12,
        gap: 8,
    },
    backButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
})
