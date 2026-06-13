import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";
import { useEffect } from "react";
import { Sen_400Regular, Sen_700Bold } from "@expo-google-fonts/sen";
import { SafeAreaView } from "react-native-safe-area-context";

WebBrowser.maybeCompleteAuthSession();
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    Sen_400Regular: Sen_400Regular,
    Sen_700Bold: Sen_700Bold,
  });

  useEffect(() => {
    const sub = Linking.addEventListener("url", ({ url }) => {
      console.log("🔗 Deep link recibido:", url);
    });

    Linking.getInitialURL().then((url) => {
      console.log("🔗 Initial URL:", url);
    });

    return () => sub.remove();
  }, []);

  useEffect(() => {
    if (loaded) SplashScreen.hideAsync();
  }, [loaded]);

  if (!loaded) return null;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#000" }}>
      <Stack>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </SafeAreaView>
  );
}
