import {
  View,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
} from "react-native";
import { Colors } from "../../constants/theme";
import { Link } from "expo-router";
import Entypo from "@expo/vector-icons/Entypo";
import { useState } from "react";

import { HeaderUserActions } from "../../components/HeaderUserActions";
import { FormText } from "../../components/FormText";
import { GoogleBtn } from "../../components/GoogleBtn";
import { Button } from "../../components/Btn";
import { auth, db } from "../../utils/firebase";
import { createUserWithEmailAndPassword, deleteUser } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useTheme } from "../../contexts/ThemeContext";

export default function SingUpScreen() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { colors } = useTheme();
  const styles = getStyles(colors);

  const handleSignup = async () => {
    if (
      email.trim() === "" ||
      password.trim() === "" ||
      !email ||
      !password ||
      username.trim() === "" ||
      !username ||
      confirmPassword.trim() === "" ||
      !confirmPassword
    ) {
      Alert.alert("ERROR", "Please fill all fields.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("ERROR", "Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      try {
        await setDoc(
          doc(db, "users", result.user.uid),
          {
            username,
            email: result.user.email,
            photoURL: "",
            createdAt: new Date(),
            lastLogin: new Date(),
            preferences: {
              theme: "dark",
              notifications: true,
            },
          },
          { merge: true },
        );
      } catch (profileErr) {
        await deleteUser(result.user);
        Alert.alert(
          "ERROR",
          "An error occurred while creating your profile. Please try again.",
        );
        console.error("Error creating user profile:", profileErr);

        return;
      }
    } catch (err: any) {
      if (err.code === "auth/email-already-in-use") {
        Alert.alert("ERROR", "Your email is already in use.");
      } else if (err.code === "auth/weak-password") {
        Alert.alert(
          "ERROR",
          "Your password is too weak. Please choose a stronger password.",
        );
      } else {
        Alert.alert(
          "ERROR",
          "An error occurred during sign up. Please try again.",
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Link href="/login" asChild>
          <TouchableOpacity style={styles.backBtn} activeOpacity={0.7}>
            <Entypo
              name="chevron-left"
              size={30}
              color={colors.iconsUserColor}
            />
          </TouchableOpacity>
        </Link>
        <HeaderUserActions
          title="Sign Up"
          subtitle="Please sign up to get started"
        />

        <View style={styles.formContainer}>
          <FormText
            type="text"
            label="USERNAME"
            placeholder="John Doe"
            value={username}
            onChangeText={setUsername}
          />
          <FormText
            type="text"
            label="EMAIL"
            placeholder="example@gmail.com"
            value={email}
            onChangeText={setEmail}
          />
          <FormText
            type="password"
            label="PASSWORD"
            placeholder="••••••••"
            value={password}
            onChangeText={setPassword}
          />
          <FormText
            type="password"
            label="CONFIRM PASSWORD"
            placeholder="••••••••"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />

          <GoogleBtn text="SIGN UP WITH GOOGLE" action="signin" />
          <Button
            title={loading ? "LOADING..." : "SIGN UP"}
            onPress={handleSignup}
            disabled={loading}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const getStyles = (colors: typeof Colors.dark) =>
  StyleSheet.create({
    container: {
      flexGrow: 1,
      backgroundColor: colors.background,
      paddingHorizontal: 20,
      justifyContent: "center",
    },
    backBtn: {
      width: 45,
      height: 45,
      borderRadius: 20,
      backgroundColor: colors.text,
      justifyContent: "center",
      alignItems: "center",
      position: "absolute",
      top: 20,
      left: 20,
      zIndex: 1,
    },

    formContainer: {
      flex: 1,
      gap: 20,
      marginBottom: 150,
    },

    footerContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    rememberMe: {
      flexDirection: "row",
      gap: 8,
    },
    checkbox: {
      width: 20,
      height: 20,
      borderRadius: 4,
      backgroundColor: colors.searchText,
      marginRight: 8,
      borderColor: colors.text,
      borderWidth: 1,
    },
    remeberMeText: {
      color: colors.searchText,
    },
    forgotText: {
      color: colors.accentText,
      fontSize: 14,
      fontFamily: "Sen_400Regular",
    },

    footer: {
      flexDirection: "row",
      justifyContent: "center",
      marginBottom: 40,
    },
    footerText: {
      color: colors.searchText,
      fontSize: 16,
      fontFamily: "Sen_400Regular",
    },
    signupText: {
      color: colors.action,
      fontSize: 16,
      fontFamily: "Sen_700Bold",
    },
  });
