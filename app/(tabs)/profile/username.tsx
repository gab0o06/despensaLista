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
import { useTheme } from "../../../contexts/ThemeContext";

export default function UsernameChange() {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { colors } = useTheme();
  const styles = getStyles(colors);

  const isValidUsername = (username: string) => {
    const usernameRegex = /^[a-zA-Z0-9]{2,15}$/;
    return usernameRegex.test(username);
  };

  const handleUsernameChange = async () => {
    const user = auth.currentUser;

    if (!user) {
      alert("No user is currently signed in.");
      return router.push("/(auth)/login");
    }

    if (!isValidUsername(username))
      return alert(
        "El username debe tener entre 2 y 15 caracteres y no puede contener caracteres especiales.",
      );

    try {
      setLoading(true);
      const userRef = doc(db, "users", user.uid);

      await updateDoc(userRef, {
        username: username.trim(),
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
        title="Username"
        subtitle="Elige tu nombre de usuario único."
      />
      <View style={styles.mainFormContainer}>
        <FormText
          type="text"
          label="Username"
          placeholder="Tu Nuevo Nombre"
          maxLength={15}
          value={username}
          onChangeText={setUsername}
        />
        <View style={styles.mainInfoFormContainer}>
          <Ionicons
            name="information-circle"
            size={30}
            color={colors.textMuted}
          />
          <Text
            style={{
              color: colors.textMuted,
              fontFamily: "Sen_400Regular",
              flex: 1,
              flexWrap: "wrap",
            }}
          >
            Tu username debe tener entre 2 o 15 caracteres sin tener caracteres
            especiales
          </Text>
        </View>
      </View>
      <Button
        title={loading ? "GUARDANDO..." : "GUARDAR"}
        onPress={handleUsernameChange}
        backgroundColor={colors.secondary}
        disabled={loading}
      />
    </View>
  );
}

const getStyles = (colors: typeof Colors.dark) =>
  StyleSheet.create({
    body: {
      flex: 1,
      backgroundColor: colors.background,
      paddingHorizontal: 20,
    },
    mainFormContainer: {
      marginTop: 10,
      marginBottom: 30,
      gap: 12,
    },

    mainInfoFormContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginVertical: 10,
      gap: 10,
    },
  });
