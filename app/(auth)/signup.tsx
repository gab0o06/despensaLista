import {
  View,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { Colors } from "../../constants/theme";
import { Link } from "expo-router";
import Entypo from "@expo/vector-icons/Entypo";

import { HeaderUserActions } from "../../components/HeaderUserActions";
import { FormText } from "../../components/FormText";
import { GoogleBtn } from "../../components/GoogleBtn";
import { Button } from "../../components/Btn";

export default function SingUpScreen() {
  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Link href="/login" asChild>
          <TouchableOpacity style={styles.backBtn} activeOpacity={0.7}>
            <Entypo name="chevron-left" size={30} color="black" />
          </TouchableOpacity>
        </Link>
        <HeaderUserActions
          title="Sign Up"
          subtitle="Please sign up to get started"
        />

        <View style={styles.formContainer}>
          <GoogleBtn text="SIGN UP WITH GOOGLE" action="signUp" />
          <FormText label="USERNAME" placeholder="John Doe" />
          <FormText label="EMAIL" placeholder="example@gmail.com" />
          <FormText label="PASSWORD" placeholder="••••••••" />
          <FormText label="CONFIRM PASSWORD" placeholder="••••••••" />

          <Button title="SIGN UP" onPress={() => {}} />
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
  backBtn: {
    width: 45,
    height: 45,
    borderRadius: 20,
    backgroundColor: Colors.dark.text,
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
    backgroundColor: Colors.dark.textMuted,
    marginRight: 8,
    borderColor: Colors.dark.text,
    borderWidth: 1,
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
