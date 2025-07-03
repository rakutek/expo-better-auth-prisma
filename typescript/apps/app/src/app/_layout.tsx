import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import 'react-native-reanimated'

import { authClient } from '@/lib/auth-client'

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  })
  const { data: session, isPending } = authClient.useSession()
  const isAuthenticated = !!(session && session.user && session.user.id)

  if (!loaded || isPending) {
    // Async font loading only occurs in development.
    return null
  }

  return (
    <>
      <Stack>
        <Stack.Protected guard={isAuthenticated}>
          <Stack.Screen
            name="(tabs)"
            options={{ headerShown: false }}
          />

        </Stack.Protected>
        <Stack.Screen
          name="loginPage"
          options={{ headerShown: false }}
        />
      </Stack>
      <StatusBar style="auto" />
    </>
  )
}
