import { Stack } from "expo-router"
import { View ,Text} from "react-native"

export default function Screen() {
    return (
        <>
            <Stack.Screen options={{ title: "Login" }} />
            <View className="flex-1 items-center justify-center">
                <Text className="text-2xl font-bold">Login Page</Text>
                <Text className="mt-4 text-lg">This is the login page.</Text>
            </View>
        </>
    );
}