import { authClient } from "@/lib/auth-client"
import { Stack } from "expo-router"
import { View, Text, TouchableOpacity, Alert } from "react-native"
import { useState } from "react"

export default function LoginScreen() {
    const [isLoading, setIsLoading] = useState(false)

    const login = async () => {
        try {
            setIsLoading(true)
            await authClient.signIn.social({
                provider: "google",
                callbackURL: "rakuri://",
            })
        } catch (error) {
            Alert.alert("ログインエラー", "ログインに失敗しました。もう一度お試しください。")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <>
            <Stack.Screen options={{ title: "ログイン", headerShown: false }} />

            <View className="flex-1 bg-gradient-to-br from-blue-50 to-indigo-100">
                {/* Header Section */}
                <View className="flex-1 justify-center items-center px-8">
                    {/* App Logo/Icon */}
                    <View className="w-24 h-24 bg-blue-500 rounded-full items-center justify-center mb-8 shadow-lg">
                        <Text className="text-white text-3xl font-bold">R</Text>
                    </View>

                    {/* Welcome Text */}
                    <Text className="text-3xl font-bold text-gray-800 mb-2 text-center">
                        おかえりなさい
                    </Text>
                    <Text className="text-lg text-gray-600 mb-12 text-center px-4">
                        アカウントにログインして続行してください
                    </Text>

                    {/* Login Button */}
                    <TouchableOpacity
                        className={`w-full max-w-sm bg-white rounded-2xl p-4 flex-row items-center justify-center shadow-lg border border-gray-200 ${
                            isLoading ? 'opacity-50' : ''
                        }`}
                        onPress={login}
                        disabled={isLoading}
                    >
                        {/* Google Icon placeholder */}
                        <View className="w-6 h-6 bg-red-500 rounded-full mr-3">
                            <Text className="text-white text-xs font-bold text-center leading-6">G</Text>
                        </View>
                        <Text className="text-gray-700 text-lg font-semibold">
                            {isLoading ? 'ログイン中...' : 'Googleでログイン'}
                        </Text>
                    </TouchableOpacity>

                    {/* Additional Info */}
                    <Text className="text-sm text-gray-500 mt-8 text-center px-8">
                        ログインすることで、利用規約とプライバシーポリシーに同意したものとみなされます
                    </Text>
                </View>

                {/* Footer */}
                <View className="pb-8 px-8">
                    <Text className="text-center text-gray-400 text-sm">
                        初回利用の方も同じボタンからアカウント作成できます
                    </Text>
                </View>
            </View>
        </>
    );
}