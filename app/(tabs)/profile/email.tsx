import { View, StyleSheet, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { Colors } from "../../../constants/theme";
import { HeaderShopsBack } from "../../../components/HeaderShopsBack";
import { FormText } from "../../../components/FormText";
import { Button } from "../../../components/Btn";
import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../../utils/firebase";
import { useRouter } from "expo-router";

export default function EmailChange() {
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = async () => {
    const user = auth.currentUser;

    if (!user) {
      alert("No user is currently signed in.");
      return router.push("/(auth)/login");
    }

    if (!isValidEmail(email))
      return alert("Por favor, introduce un correo electrónico válido.");

    if (email !== confirmEmail)
      return alert(
        "Los correos electrónicos no coinciden. Por favor, verifica.",
      );

    try {
      setLoading(true);
      const userRef = doc(db, "users", user.uid);

      await updateDoc(userRef, {
        email: email,
      });
      //   alert("Username actualizado correctamente.");
      router.back();
    } catch (err) {
      console.error("Error updating username: ", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.body}>
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
        title={loading ? "GUARDANDO..." : "GUARDAR"}
        onPress={handleEmailChange}
        backgroundColor={Colors.dark.secondary}
        disabled={loading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: Colors.dark.background,
    paddingHorizontal: 20,
  },
  mainFormContainer: {
    marginTop: 10,
    marginBottom: 30,
    gap: 16,
  },
  infoText: {
    color: Colors.dark.textMuted,
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
    color: Colors.dark.text,
    fontFamily: "Sen_400Regular",
    fontSize: 16,
  },
  inputTextContainer: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  inputText: {
    color: Colors.dark.textMuted,
    fontFamily: "Sen_400Regular",
    fontSize: 20,
  },
});
