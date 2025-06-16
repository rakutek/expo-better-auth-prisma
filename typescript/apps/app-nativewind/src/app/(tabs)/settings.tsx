import { View, Alert, Pressable } from "react-native";
import { authClient } from "@/lib/auth-client";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "@/lib/useColorScheme";
import { MoonStar } from "@/lib/icons/MoonStar";
import { Sun } from "@/lib/icons/Sun";
import { setAndroidNavigationBar } from "@/lib/android-navigation-bar";

export default function SettingsTab() {
  const { data: session, isPending } = authClient.useSession();
  const { isDarkColorScheme, setColorScheme } = useColorScheme();
  
  const handleLogout = async () => {
    try {
      await authClient.signOut();
    } catch (error) {
      Alert.alert("エラー", "ログアウトに失敗しました");
    }
  };

  const toggleColorScheme = () => {
    const newTheme = isDarkColorScheme ? "light" : "dark";
    setColorScheme(newTheme);
    setAndroidNavigationBar(newTheme);
  };

  if (isPending) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>読み込み中...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-secondary/30 p-5">
      <Text className="text-2xl font-bold mb-8">設定</Text>
      {session?.user && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>アカウント情報</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <View>
              <Text className="text-sm text-muted-foreground mb-1">メールアドレス:</Text>
              <Text className="text-base font-medium">
                {session.user.email}
              </Text>
            </View>
            <View>
              <Text className="text-sm text-muted-foreground mb-1">名前:</Text>
              <Text className="text-base font-medium">
                {session.user.name || "未設定"}
              </Text>
            </View>
            <View>
              <Text className="text-sm text-muted-foreground mb-1">ユーザーID:</Text>
              <Text className="text-base font-medium">
                {session.user.id}
              </Text>
            </View>
          </CardContent>
        </Card>
      )}

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>テーマ設定</CardTitle>
        </CardHeader>
        <CardContent>
          <View className="flex-row items-center justify-between">
            <Text className="text-base">
              {isDarkColorScheme ? "ダークモード" : "ライトモード"}
            </Text>
            <Pressable
              onPress={toggleColorScheme}
              className="flex-row items-center justify-center w-14 h-8 bg-secondary rounded-full border border-border"
            >
              {isDarkColorScheme ? (
                <MoonStar className="text-foreground" size={20} strokeWidth={1.25} />
              ) : (
                <Sun className="text-foreground" size={20} strokeWidth={1.25} />
              )}
            </Pressable>
          </View>
        </CardContent>
      </Card>

      <Button
        onPress={handleLogout}
        variant="destructive"
      >
        <Text>ログアウト</Text>
      </Button>
    </View>
  );
}
