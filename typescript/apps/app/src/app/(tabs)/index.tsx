import { Image } from 'expo-image'
import { Platform, StyleSheet, Pressable, Alert, View, Text } from 'react-native'
import { Link } from 'expo-router'

import { HelloWave } from '@/components/HelloWave'
import { authClient } from '@/lib/auth-client'
import { Colors } from '@/constants/Colors'

export default function HomeScreen() {
  const { data: session, isPending } = authClient.useSession()

  return (
    <View style={[styles.container, { backgroundColor: Colors.background }]}>
      <View style={[styles.titleContainer, { backgroundColor: Colors.background }]}>
        <Text style={[styles.title, { color: Colors.text }]}>{session?.user.name}</Text>
        <HelloWave />
      </View>
      <View style={[styles.stepContainer, { backgroundColor: Colors.background }]}>
        <Text style={[styles.subtitle, { color: Colors.text }]}>Step 1: Try it</Text>
        <Text style={{ color: Colors.text }}>
          Edit <Text style={[styles.defaultSemiBold, { color: Colors.text }]}>app/(tabs)/index.tsx</Text> to see changes.
          Press{' '}
          <Text style={[styles.defaultSemiBold, { color: Colors.text }]}>
            {Platform.select({
              ios: 'cmd + d',
              android: 'cmd + m',
              web: 'F12',
            })}
          </Text>{' '}
          to open developer tools.
        </Text>
      </View>
      <View style={[styles.stepContainer, { backgroundColor: Colors.background }]}>
        <Text style={[styles.subtitle, { color: Colors.text }]}>Step 2: Explore</Text>
        <Text style={{ color: Colors.text }}>
          {`Tap the Explore tab to learn more about what's included in this starter app.`}
        </Text>
      </View>
      <View style={[styles.stepContainer, { backgroundColor: Colors.background }]}>
        <Text style={[styles.subtitle, { color: Colors.text }]}>Step 3: Get a fresh start</Text>
        <Text style={{ color: Colors.text }}>
          {`When you're ready, run `}
          <Text style={[styles.defaultSemiBold, { color: Colors.text }]}>npm run reset-project</Text> to get a fresh{' '}
          <Text style={[styles.defaultSemiBold, { color: Colors.text }]}>app</Text> directory. This will move the current{' '}
          <Text style={[styles.defaultSemiBold, { color: Colors.text }]}>app</Text> to{' '}
          <Text style={[styles.defaultSemiBold, { color: Colors.text }]}>app-example</Text>.
        </Text>
      </View>
      <View style={[styles.demoContainer, { backgroundColor: Colors.background }]}>
        <Link href="/demo-detail" asChild>
          <Pressable style={styles.demoButton}>
            <Text style={styles.demoButtonText}>View Demo Detail</Text>
          </Pressable>
        </Link>
      </View>
    </View>
  )
}
const HEADER_HEIGHT = 250
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  header: {
    height: HEADER_HEIGHT,
    overflow: 'hidden',
  },
  content: {
    flex: 1,
    padding: 32,
    gap: 16,
    overflow: 'hidden',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  demoContainer: {
    marginTop: 16,
    alignItems: 'center',
  },
  demoButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  demoButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  defaultSemiBold: {
    fontWeight: '600',
  },
})

