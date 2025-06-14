import { useColorScheme as useNativewindColorScheme } from 'nativewind';

export function useColorScheme() {
  const { colorScheme, setColorScheme, toggleColorScheme } = useNativewindColorScheme();
  return {
    colorScheme: colorScheme ?? 'dark',
    isDarkColorScheme: colorScheme === 'dark',
    // colorScheme: "light", // Force light mode for consistency',
    // isDarkColorScheme: true,
    setColorScheme,
    toggleColorScheme,
  };
}
