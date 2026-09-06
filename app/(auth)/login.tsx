import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
} from "react-native";
import { Link } from "expo-router";
import { Colors } from "../../constants/theme";

import { HeaderUserActions } from "../../components/HeaderUserActions";
import { FormText } from "../../components/FormText";
import { GoogleBtn } from "../../components/GoogleBtn";
import { Button } from "../../components/Btn";
import { useState } from "react";
import Entypo from "@expo/vector-icons/Entypo";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../utils/firebase";
import { useTheme } from "../../contexts/ThemeContext";

export default function LoginScreen() {
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { colors } = useTheme();
  const styles = getStyles(colors);

  const handleLogin = async () => {
    if (email.trim() === "" || password.trim() === "" || !email || !password) {
      alert("Please fill in both email and password fields.");
      return;
    }

    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err: any) {
      if (err.code === "auth/invalid-credential") {
        Alert.alert("ERROR", "Invalid email or password.");
      } else if (err.code === "auth/too-many-requests") {
        Alert.alert(
          "ERROR",
          "Too many login attempts. Please try again later.",
        );
      } else {
        Alert.alert(
          "ERROR",
          "An error occurred during login. Please try again.",
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
        <HeaderUserActions
          title="Log In"
          subtitle="Please sign in to your existing account"
        />

        <View style={styles.formContainer}>
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
          <View style={styles.footerContainer}>
            <TouchableOpacity
              style={styles.rememberMe}
              onPress={() => setRememberMe(!rememberMe)}
            >
              <View style={styles.checkbox}>
                {rememberMe && <Entypo name="check" size={18} color="white" />}
              </View>
              <Text style={styles.remeberMeText}>Remember me</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.forgotText}>Forgot Password</Text>
            </TouchableOpacity>
          </View>

          <GoogleBtn text="LOG IN WITH GOOGLE" action="login" />
          <Button
            title={loading ? "LOADING..." : "LOG IN"}
            onPress={handleLogin}
            disabled={loading}
          />
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>{"Don't have an account? "}</Text>
          <Link href="/signup" asChild>
            <TouchableOpacity>
              <Text style={styles.signupText}>SIGN UP</Text>
            </TouchableOpacity>
          </Link>
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

    formContainer: {
      flex: 1,
      gap: 20,
      marginBottom: 30,
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
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
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
      color: colors.text,
      fontSize: 16,
      fontFamily: "Sen_400Regular",
    },
    signupText: {
      color: colors.accentText,
      fontSize: 16,
      fontFamily: "Sen_700Bold",
    },
  });
