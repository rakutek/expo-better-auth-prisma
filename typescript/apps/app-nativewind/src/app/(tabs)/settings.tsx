import { View, Text, TouchableOpacity, Alert } from "react-native";
import { authClient } from "@/lib/auth-client";

export default function SettingsTab() {
  const { data: session, isPending } = authClient.useSession();

  const handleLogout = async () => {
    try {
      await authClient.signOut();
    } catch (error) {
      Alert.alert("エラー", "ログアウトに失敗しました");
    }
  };

  if (isPending) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-50">
        <Text className="text-gray-600">読み込み中...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 p-5 bg-gray-50">
      <Text className="text-2xl font-bold mb-8 text-gray-800">設定</Text>

      {session?.user && (
        <View className="bg-white rounded-xl p-5 mb-8 shadow-sm">
          <Text className="text-lg font-bold mb-4 text-gray-800">
            アカウント情報
          </Text>
          <View className="mb-3">
            <Text className="text-sm text-gray-600 mb-1">メールアドレス:</Text>
            <Text className="text-base text-gray-800 font-medium">
              {session.user.email}
            </Text>
          </View>
          <View className="mb-3">
            <Text className="text-sm text-gray-600 mb-1">名前:</Text>
            <Text className="text-base text-gray-800 font-medium">
              {session.user.name || "未設定"}
            </Text>
          </View>
          <View className="mb-3">
            <Text className="text-sm text-gray-600 mb-1">ユーザーID:</Text>
            <Text className="text-base text-gray-800 font-medium">
              {session.user.id}
            </Text>
          </View>
        </View>
      )}

      <TouchableOpacity
        className="bg-red-500 rounded-xl p-4 items-center"
        onPress={handleLogout}
      >
        <Text className="text-white text-base font-bold">ログアウト</Text>
      </TouchableOpacity>
    </View>
  );
}
