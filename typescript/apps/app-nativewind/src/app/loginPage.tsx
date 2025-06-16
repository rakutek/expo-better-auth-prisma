import { authClient } from "@/lib/auth-client"
import { Stack } from "expo-router"
import { View ,Text} from "react-native"

export default function Screen() {

const login = async()=>{
    	await authClient.signIn.social({
					provider: "google",
					callbackURL: "rakuri://",
				})
}
    return (
        <>
            <Stack.Screen options={{ title: "Login" }} />

            <View className="flex-1 items-center justify-center">
                <Text className="text-2xl mb-4">Login Page</Text>
                <Text className="text-lg mb-4">Please login to continue</Text>
                <Text
                    className="text-blue-500 underline"
                    onPress={login}
                >
                    Login with Google
                </Text>
            </View>
        </>
    );
}