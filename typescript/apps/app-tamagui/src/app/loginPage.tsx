import { authClient } from "../lib/auth-client";
import { Stack } from "expo-router";
import { YStack, XStack, View, Text, Button, H2, Paragraph, useTheme } from "tamagui";
import { User } from "@tamagui/lucide-icons";
import { useToastController } from "@tamagui/toast";
import { useState } from "react";

export default function LoginScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const theme = useTheme();
  const toast = useToastController();

  const login = async () => {
    try {
      setIsLoading(true);
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "rakuri://",
      });
    } catch (error) {
      toast.show("ログインエラー", {
        message: "ログインに失敗しました。もう一度お試しください。",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Stack.Screen options={{ title: "ログイン", headerShown: false }} />

      <YStack 
        flex={1} 
        bg="$background" 
        justify="center" 
        p="$4"
        style={{
          background: `linear-gradient(135deg, ${theme.blue2.val} 0%, ${theme.blue4.val} 100%)`
        }}
      >
        {/* Header Section */}
        <YStack flex={1} justify="center" items="center" gap="$6">
          {/* App Logo/Icon */}
          <View
            width={96}
            height={96}
            bg="$blue10"
            borderRadius={48}
            items="center"
            justify="center"
            shadowColor="$shadowColor"
            shadowOffset={{ width: 0, height: 4 }}
            shadowOpacity={0.1}
            shadowRadius={8}
          >
            <Text color="white" fontSize={32} fontWeight="bold">
              R
            </Text>
          </View>

          {/* Welcome Text */}
          <YStack items="center" gap="$2">
            <H2 color="$color12" textAlign="center" fontWeight="bold">
              おかえりなさい
            </H2>
            <Paragraph 
              color="$color11" 
              textAlign="center" 
              fontSize={18}
              maxWidth={300}
            >
              アカウントにログインして続行してください
            </Paragraph>
          </YStack>

          {/* Login Button */}
          <Button
            size="$5"
            bg="white"
            color="$color12"
            borderColor="$borderColor"
            borderWidth={1}
            shadowColor="$shadowColor"
            shadowOffset={{ width: 0, height: 2 }}
            shadowOpacity={0.1}
            shadowRadius={4}
            opacity={isLoading ? 0.5 : 1}
            onPress={login}
            disabled={isLoading}
            minWidth={280}
            icon={
              <View
                width={24}
                height={24}
                bg="$red9"
                borderRadius={12}
                items="center"
                justify="center"
              >
                <Text color="white" fontSize={12} fontWeight="bold">
                  G
                </Text>
              </View>
            }
            hoverStyle={{
              bg: "$color2",
              borderColor: "$color6"
            }}
            pressStyle={{
              bg: "$color3",
              scale: 0.98
            }}
          >
            {isLoading ? "ログイン中..." : "Googleでログイン"}
          </Button>

          {/* Additional Info */}
          <Paragraph 
            color="$color10" 
            textAlign="center" 
            fontSize={12}
            maxWidth={320}
            mt="$4"
          >
            ログインすることで、利用規約とプライバシーポリシーに同意したものとみなされます
          </Paragraph>
        </YStack>

        {/* Footer */}
        <YStack pb="$6" px="$4">
          <Paragraph 
            color="$color9" 
            textAlign="center" 
            fontSize={12}
          >
            初回利用の方も同じボタンからアカウント作成できます
          </Paragraph>
        </YStack>
      </YStack>
    </>
  );
}
