import { Stack } from "expo-router";
import {StatusBar} from "expo-status-bar";
import {
  useFonts, PlayfairDisplay_700Bold, }
  from "@expo-google-fonts/playfair-display";
  import { Inter_400Regular, Inter_600SemiBold, Inter_700Bold,    
} from "@expo-google-fonts/inter";

export default function RootLayout() {
  const [loaded] = useFonts({
    PlayfairDisplay_700Bold, Inter_400Regular, Inter_600SemiBold, Inter_700Bold,
  });

  if (!loaded) return null;

  return (
  <>
    <StatusBar style="light" />
    <Stack screenOptions={{headerShown: false}} />
  </>
  );
}
