import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import 'react-native-reanimated'

import { authClient } from '@/lib/auth-client'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'

export default function RootLayout() {

  const { data: session, isPending } = authClient.useSession()
  const isAuthenticated = !!(session && session.user && session.user.id)

  if (isPending) {
    // Async font loading only occurs in development.
    return null
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff', paddingHorizontal: 16, }} edges={['top', 'left', 'right']}>
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
      </SafeAreaView>

      <StatusBar style="auto" />
    </SafeAreaProvider>
  )
}
