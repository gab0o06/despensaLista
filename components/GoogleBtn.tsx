import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { Image } from "expo-image";
import { makeRedirectUri } from "expo-auth-session";
import { useEffect } from "react";
import { router } from "expo-router";
import * as WebBrowser from "expo-web-browser";

import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import * as Google from "expo-auth-session/providers/google";
import { auth, db } from "../utils/firebase";
import { Colors } from "../constants/theme";

WebBrowser.maybeCompleteAuthSession();

interface GoogleBtnProps {
  text?: string;
  action?: "signIn" | "signUp";
}

export const GoogleBtn = ({ text, action }: GoogleBtnProps) => {
  const [req, res, promptAsync] = Google.useAuthRequest({
    androidClientId: process.env.EXPO_PUBLIC_ANDROID_ID,
    webClientId: process.env.EXPO_PUBLIC_WEB_ID,
  });

  console.log(makeRedirectUri({ scheme: "despensalista" }));

  // useEffect(() => {
  //   if (res?.type === "success") {
  //     const { id_token } = res.params;
  //     const credential = GoogleAuthProvider.credential(id_token);

  //     signInWithCredential(auth, credential)
  //       .then((userCredential) => {
  //         const user = userCredential.user;
  //         console.log("Google Sign-In successful:", user);
  //         router.replace("/(tabs)");
  //       })
  //       .catch((error) => {
  //         console.error("Google Sign-In error:", error);
  //       });
  //   }
  // }, [res]);

  useEffect(() => {
    console.log("res:", JSON.stringify(res, null, 2));
  }, [res]);

  return (
    <TouchableOpacity
      style={styles.googleBtn}
      activeOpacity={0.5}
      disabled={!req}
      onPress={() => {
        promptAsync().catch((err) => console.log(err));
      }}
    >
      <Text style={styles.googleBtnText}>{text}</Text>
      <Image
        source={require("../assets/googleIcon.svg")}
        style={styles.googleBtnIcon}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  googleBtn: {
    backgroundColor: "#FFFFFF12",
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 12,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  googleBtnText: {
    color: Colors.dark.text,
    fontFamily: "Sen_700Bold",
    fontSize: 16,
  },
  googleBtnIcon: {
    width: 40,
    height: 40,
  },
});
