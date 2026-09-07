import { View, ScrollView, StyleSheet, Text, Alert } from "react-native";
import { Colors } from "../../../constants/theme";
import { HeaderShopsBack } from "../../../components/HeaderShopsBack";
import { Button } from "../../../components/Btn";

import { useLocalSearchParams, useRouter } from "expo-router";
import { auth, db } from "../../../utils/firebase";
import { doc, deleteDoc } from "firebase/firestore";
import { useState } from "react";
import { useTheme } from "../../../contexts/ThemeContext";

export default function DeleteShop() {
  const userId = auth.currentUser?.uid;
  const route = useRouter();
  const [loading, setLoading] = useState(false);
  const id = useLocalSearchParams<{ id: string }>().id;
  const { colors } = useTheme();
  const styles = getStyles(colors);

  const handleDeleteShop = async () => {
    if (!userId) {
      return route.replace("/(auth)/login");
    }
    if (!id) {
      return;
    }
    setLoading(true);
    try {
      await deleteDoc(doc(db, "shops", id));
      route.replace("/(tabs)/shops");
    } catch (error) {
      console.error("Error deleting shop: ", error);
      Alert.alert(
        "Error",
        "No se pudo eliminar la tienda. Intenta nuevamente.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode="on-drag"
      style={styles.body}
    >
      <View>
        <HeaderShopsBack />
      </View>
      <View style={styles.formContainer}>
        <View style={styles.txtContainer}>
          <Text style={styles.title}>Eliminar Tienda</Text>
          <Text style={styles.subtitle}>
            ¿Estás seguro de querer eliminar la tienda? Este es un proceso
            irreversible...
          </Text>
        </View>
        <Button
          title="ELIMINAR"
          backgroundColor={colors.error}
          onPress={handleDeleteShop}
          disabled={loading}
        />
        <Button
          title="CANCELAR"
          backgroundColor={colors.action}
          onPress={() => {
            route.back();
          }}
        />
      </View>
    </ScrollView>
  );
}

const getStyles = (colors: typeof Colors.dark) =>
  StyleSheet.create({
    body: {
      flex: 1,
      backgroundColor: colors.background,
      paddingHorizontal: 20,
    },
    formContainer: {
      gap: 16,
      justifyContent: "center",
      marginTop: 100,
      marginBottom: 120,
    },
    txtContainer: {
      marginBottom: 20,
      flexDirection: "column",
      alignContent: "center",
    },
    title: {
      fontSize: 40,
      fontFamily: "Sen_700Bold",
      color: colors.text,
      textAlign: "center",
    },
    subtitle: {
      fontSize: 16,
      fontFamily: "Sen_400Regular",
      color: colors.searchText,
      textAlign: "center",
    },
  });
