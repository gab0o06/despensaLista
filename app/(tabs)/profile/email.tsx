import { View, StyleSheet, Text, Alert, ScrollView } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  verifyBeforeUpdateEmail,
} from "firebase/auth";

import { Colors } from "../../../constants/theme";
import { HeaderShopsBack } from "../../../components/HeaderShopsBack";
import { FormText } from "../../../components/FormText";
import { Button } from "../../../components/Btn";
import { doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../../utils/firebase";
import { useTheme } from "../../../contexts/ThemeContext";

export default function EmailChange() {
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { colors } = useTheme();
  const styles = getStyles(colors);

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = async () => {
    const user = auth.currentUser;

    if (!user) {
      Alert.alert("ERROR", "No user is currently signed in.");
      return router.push("/(auth)/login");
    }

    if (currentPassword.trim() === "" || !currentPassword) {
      return Alert.alert("ERROR", "Por favor, introduce tu contraseña actual.");
    }

    if (!isValidEmail(email))
      return Alert.alert(
        "ERROR",
        "Por favor, introduce un correo electrónico válido.",
      );

    if (email !== confirmEmail)
      return Alert.alert(
        "ERROR",
        "Los correos electrónicos no coinciden. Por favor, verifica.",
      );

    try {
      setLoading(true);
      const cred = EmailAuthProvider.credential(user.email!, currentPassword);
      await reauthenticateWithCredential(user, cred);

      const userRef = doc(db, "users", user.uid);
      await verifyBeforeUpdateEmail(user, email);
      Alert.alert(
        "ÉXITO",
        "Se ha enviado un correo de verificación a tu nuevo email.",
      );

      await updateDoc(userRef, {
        email: email,
      });
      router.back();
    } catch (err: any) {
      if (err.code === "auth/wrong-password") {
        Alert.alert(
          "ERROR",
          "Contraseña incorrecta. Por favor, inténtalo de nuevo.",
        );
      } else if (err.code === "auth/invalid-credential") {
        Alert.alert(
          "ERROR",
          "Credenciales inválidas. Por favor, inténtalo de nuevo.",
        );
      } else {
        Alert.alert(
          "ERROR",
          "Error al actualizar el correo electrónico. Por favor, inténtalo de nuevo.",
        );
      }
      console.error("Error updating email: ", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.body}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <HeaderShopsBack
        title="Email"
        subtitle="Gestiona tu dirección de correo de la cuenta"
      />
      <View style={styles.mainFormContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>CORREO ACTUAL</Text>
          <View style={styles.inputTextContainer}>
            <Text style={styles.inputText}>{auth.currentUser?.email}</Text>
          </View>
        </View>
        <View style={styles.mainInputFormContainer}>
          <FormText
            type="password"
            label="CONTRASEÑA ACTUAL"
            placeholder="••••••••"
            value={currentPassword}
            onChangeText={setCurrentPassword}
          />
          <FormText
            type="text"
            label="NUEVO CORREO"
            placeholder="correo@ejemplo.com"
            maxLength={100}
            value={email}
            onChangeText={setEmail}
          />
          <FormText
            type="text"
            label="CONFIRMAR CORREO"
            placeholder="correo@ejemplo.com"
            maxLength={100}
            value={confirmEmail}
            onChangeText={setConfirmEmail}
          />
        </View>
      </View>
      <Button
        title={loading ? "ENVIANDO..." : "ENVIAR LINK"}
        onPress={handleEmailChange}
        backgroundColor={colors.secondary}
        disabled={loading}
      />
    </ScrollView>
  );
}

const getStyles = (colors: typeof Colors.dark) =>
  StyleSheet.create({
    body: {
      flexGrow: 1,
      backgroundColor: colors.background,
      paddingHorizontal: 20,
      paddingBottom: 120,
    },
    mainFormContainer: {
      marginTop: 10,
      marginBottom: 30,
      gap: 16,
    },
    infoText: {
      color: colors.textMuted,
      fontFamily: "Sen_400Regular",
      fontSize: 14,
    },
    mainInputFormContainer: {
      gap: 16,
    },
    inputContainer: {
      gap: 16,
    },
    inputLabel: {
      color: colors.text,
      fontFamily: "Sen_400Regular",
      fontSize: 16,
    },
    inputTextContainer: {
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
    inputText: {
      color: colors.textMuted,
      fontFamily: "Sen_400Regular",
      fontSize: 20,
    },
  });
