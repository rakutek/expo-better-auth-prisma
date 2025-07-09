import { Image } from 'expo-image'
import { Platform, StyleSheet, View, Text, ScrollView } from 'react-native'

import { Collapsible } from '@/components/Collapsible'
import { ExternalLink } from '@/components/ExternalLink'
import { IconSymbol } from '@/components/ui/IconSymbol'
import { Colors } from '@/constants/Colors'

export default function TabTwoScreen() {
  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: Colors.background }}>
      <View style={[styles.titleContainer, { backgroundColor: Colors.background }]}>
        <Text style={[styles.title, { color: Colors.text }]}>Explore</Text>
      </View>
      <Text style={{ color: Colors.text }}>This app includes example code to help you get started.</Text>
      <Collapsible title="File-based routing">
        <Text style={{ color: Colors.text }}>
          This app has two screens:{' '}
          <Text style={[styles.defaultSemiBold, { color: Colors.text }]}>app/(tabs)/index.tsx</Text> and{' '}
          <Text style={[styles.defaultSemiBold, { color: Colors.text }]}>app/(tabs)/explore.tsx</Text>
        </Text>
        <Text style={{ color: Colors.text }}>
          The layout file in <Text style={[styles.defaultSemiBold, { color: Colors.text }]}>app/(tabs)/_layout.tsx</Text>{' '}
          sets up the tab navigator.
        </Text>
        <ExternalLink href="https://docs.expo.dev/router/introduction">
          <Text style={[styles.link, { color: Colors.tint }]}>Learn more</Text>
        </ExternalLink>
      </Collapsible>
      <Collapsible title="Android, iOS, and web support">
        <Text style={{ color: Colors.text }}>
          You can open this project on Android, iOS, and the web. To open the web version, press{' '}
          <Text style={[styles.defaultSemiBold, { color: Colors.text }]}>w</Text> in the terminal running this project.
        </Text>
      </Collapsible>
      <Collapsible title="Images">
        <Text style={{ color: Colors.text }}>
          For static images, you can use the <Text style={[styles.defaultSemiBold, { color: Colors.text }]}>@2x</Text> and{' '}
          <Text style={[styles.defaultSemiBold, { color: Colors.text }]}>@3x</Text> suffixes to provide files for
          different screen densities
        </Text>
        <Image source={require('@/assets/images/react-logo.png')} style={{ alignSelf: 'center' }} />
        <ExternalLink href="https://reactnative.dev/docs/images">
          <Text style={[styles.link, { color: Colors.tint }]}>Learn more</Text>
        </ExternalLink>
      </Collapsible>
      <Collapsible title="Custom fonts">
        <Text style={{ color: Colors.text }}>
          Open <Text style={[styles.defaultSemiBold, { color: Colors.text }]}>app/_layout.tsx</Text> to see how to load{' '}
          <Text style={{ fontFamily: 'SpaceMono', color: Colors.text }}>
            custom fonts such as this one.
          </Text>
        </Text>
        <ExternalLink href="https://docs.expo.dev/versions/latest/sdk/font">
          <Text style={[styles.link, { color: Colors.tint }]}>Learn more</Text>
        </ExternalLink>
      </Collapsible>
      <Collapsible title="Animations">
        <Text style={{ color: Colors.text }}>
          This template includes an example of an animated component. The{' '}
          <Text style={[styles.defaultSemiBold, { color: Colors.text }]}>components/HelloWave.tsx</Text> component uses
          the powerful <Text style={[styles.defaultSemiBold, { color: Colors.text }]}>react-native-reanimated</Text>{' '}
          library to create a waving hand animation.
        </Text>
        {Platform.select({
          ios: null,
        })}
      </Collapsible>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 32,
  },
  defaultSemiBold: {
    fontWeight: '600',
  },
  link: {
    textDecorationLine: 'underline',
  },
})
