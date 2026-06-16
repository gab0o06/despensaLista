import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { Link } from "expo-router";
import { Colors } from "../../constants/theme";

import { HeaderUserActions } from "../../components/HeaderUserActions";
import { FormText } from "../../components/FormText";
import { GoogleBtn } from "../../components/GoogleBtn";
import { Button } from "../../components/Btn";
import { useState } from "react";
import Entypo from "@expo/vector-icons/Entypo";

export default function LoginScreen() {
  const [rememberMe, setRememberMe] = useState(false);

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
          <FormText label="EMAIL" placeholder="example@gmail.com" />
          <FormText label="PASSWORD" placeholder="••••••••" />
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
          <Button title="LOG IN" onPress={() => {}} />
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Don't have an account? </Text>
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

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: Colors.dark.background,
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
    backgroundColor: Colors.dark.textMuted,
    marginRight: 8,
    borderColor: Colors.dark.text,
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  remeberMeText: {
    color: Colors.dark.textMuted,
  },
  forgotText: {
    color: Colors.dark.secondary,
    fontSize: 14,
    fontFamily: "Sen_400Regular",
  },

  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 40,
  },
  footerText: {
    color: Colors.dark.textMuted,
    fontSize: 16,
    fontFamily: "Sen_400Regular",
  },
  signupText: {
    color: Colors.dark.accent,
    fontSize: 16,
    fontFamily: "Sen_700Bold",
  },
});
