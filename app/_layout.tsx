import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import * as Linking from "expo-linking";
import { useEffect } from "react";
import { Sen_400Regular, Sen_700Bold } from "@expo-google-fonts/sen";
import { SafeAreaView } from "react-native-safe-area-context";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

GoogleSignin.configure({
  webClientId: process.env.EXPO_PUBLIC_WEB_ID,
  offlineAccess: true,
});

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    Sen_400Regular: Sen_400Regular,
    Sen_700Bold: Sen_700Bold,
  });

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

// import { Stack, useRouter, useSegments } from "expo-router"; // 🔥 1. Agregamos useRouter y useSegments
// import { useFonts } from "expo-font";
// import * as SplashScreen from "expo-splash-screen";
// import { useEffect, useState } from "react";
// import { Sen_400Regular, Sen_700Bold } from "@expo-google-fonts/sen";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { GoogleSignin } from "@react-native-google-signin/google-signin";
// import { onAuthStateChanged, User } from "firebase/auth";
// import { auth } from "../utils/firebase";

// GoogleSignin.configure({
//   webClientId: process.env.EXPO_PUBLIC_WEB_ID,
//   offlineAccess: true,
// });

// SplashScreen.preventAutoHideAsync();

// export default function RootLayout() {
//   const [initializing, setInitializing] = useState(true);
//   const [user, setUser] = useState<User | null>(null);

//   // 🔥 2. Inicializamos los hooks de navegación
//   const router = useRouter();
//   const segments = useSegments();

//   const [loaded] = useFonts({
//     Sen_400Regular: Sen_400Regular,
//     Sen_700Bold: Sen_700Bold,
//   });

//   // Observador de Firebase
//   useEffect(() => {
//     const subscriber = onAuthStateChanged(auth, (currentUser) => {
//       setUser(currentUser);
//       if (initializing) setInitializing(false);
//     });

//     return subscriber;
//   }, [initializing]);

//   // Lógica de Redirección Automática
//   useEffect(() => {
//     if (initializing) return;

//     const inAuthGroup = segments[0] === "(auth)";

//     if (user && inAuthGroup) {
//       router.replace("/(tabs)");
//     } else if (!user && !inAuthGroup) {
//       router.replace("/(auth)/login");
//     }
//   }, [user, initializing, segments]);

//   // 🔥 3. Sincronización Maestra del Splash Screen
//   useEffect(() => {
//     // Solo ocultamos el Splash Screen cuando las fuentes cargaron Y Firebase ya respondió
//     if (loaded && !initializing) {
//       SplashScreen.hideAsync();
//     }
//   }, [loaded, initializing]);

//   // 🔥 4. Si falta alguna de las dos cosas, no renderizamos nada (el Splash sigue visible)
//   if (!loaded || initializing) return null;

//   return (
//     <SafeAreaView style={{ flex: 1, backgroundColor: "#000" }}>
//       <Stack>
//         <Stack.Screen name="(auth)" options={{ headerShown: false }} />
//         <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
//       </Stack>
//     </SafeAreaView>
//   );
// }
