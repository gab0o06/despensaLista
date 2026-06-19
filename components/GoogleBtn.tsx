import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { Image } from "expo-image";
import { router } from "expo-router";
import {
  GoogleSignin,
  isSuccessResponse,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import {
  GoogleAuthProvider,
  signInWithCredential,
  getAdditionalUserInfo,
} from "firebase/auth";

import { auth, db } from "../utils/firebase";
import { Colors } from "../constants/theme";
import { doc, setDoc } from "firebase/firestore";

interface GoogleBtnProps {
  text?: string;
  action?: "signin" | "login";
}

export const GoogleBtn = ({ text, action }: GoogleBtnProps) => {
  const handleGoogleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      if (isSuccessResponse(userInfo)) {
        const {
          data: {
            idToken,
            user: { email, name, photo },
          },
        } = userInfo;

        if (!idToken) return console.error("No idToken found");

        const credential = GoogleAuthProvider.credential(idToken);
        const result = await signInWithCredential(auth, credential);
        const details = getAdditionalUserInfo(result);

        if (details?.isNewUser) {
          await setDoc(doc(db, "users", result.user.uid), {
            username: result.user.displayName,
            email: result.user.email,
            photoURL: result.user.photoURL,
            createdAt: new Date(),
            preferences: {
              theme: "dark",
              notifications: true,
            },
          });
        }

        console.log("User signed in with Google:", { email, name, photo });
        router.replace("/(tabs)");
      }
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) return;
      if (error.code === statusCodes.IN_PROGRESS) return;
      console.error("Google Sign-In error:", error);
    }
  };

  return (
    <TouchableOpacity
      style={styles.googleBtn}
      activeOpacity={0.5}
      onPress={handleGoogleSignIn}
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
