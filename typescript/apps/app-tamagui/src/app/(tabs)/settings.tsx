import { Alert } from "react-native";
import { YStack, XStack, H2, H4, Paragraph, Button, Text } from "tamagui";
import { User, LogOut } from "@tamagui/lucide-icons";
import { authClient } from "../../lib/auth-client";

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
      <YStack flex={1} items="center" justify="center" bg="$background" p="$4">
        <Text fontSize="$5" color="$color11">
          読み込み中...
        </Text>
      </YStack>
    );
  }

  return (
    <YStack flex={1} bg="$background" p="$4" gap="$6">
      <YStack pt="$8">
        <H2 textAlign="center" color="$color12">
          設定
        </H2>
      </YStack>

      {session?.user ? (
        <YStack gap="$4">
          <YStack bg="$color2" p="$4" rounded="$4" gap="$3" borderWidth={1} borderColor="$borderColor">
            <XStack items="center" gap="$3">
              <User size="$1.5" color="$color11" />
              <H4 color="$color12">ログイン情報</H4>
            </XStack>

            <YStack gap="$2" pl="$6">
              <XStack gap="$2">
                <Text fontSize="$4" color="$color11" fontWeight="bold">
                  メール:
                </Text>
                <Paragraph fontSize="$4" color="$color12">
                  {session.user.email}
                </Paragraph>
              </XStack>

              {session.user.name && (
                <XStack gap="$2">
                  <Text fontSize="$4" color="$color11" fontWeight="bold">
                    名前:
                  </Text>
                  <Paragraph fontSize="$4" color="$color12">
                    {session.user.name}
                  </Paragraph>
                </XStack>
              )}

              <XStack gap="$2">
                <Text fontSize="$4" color="$color11" fontWeight="bold">
                  ID:
                </Text>
                <Paragraph fontSize="$4" color="$color12">
                  {session.user.id}
                </Paragraph>
              </XStack>
            </YStack>
          </YStack>

          <Button
            bg="$red9"
            color="$red12"
            hoverStyle={{ bg: "$red8" }}
            pressStyle={{ bg: "$red10" }}
            onPress={handleLogout}
            size="$4"
            icon={<LogOut size="$1" />}
          >
            ログアウト
          </Button>
        </YStack>
      ) : (
        <YStack items="center" gap="$4" pt="$8">
          <Text fontSize="$5" color="$color11">
            ログインしていません
          </Text>
          <Paragraph fontSize="$4" color="$color11" textAlign="center">
            アプリを使用するには、ログインしてください
          </Paragraph>
        </YStack>
      )}
    </YStack>
  );
}
