import { View, ScrollView, StyleSheet, Text } from "react-native";
import { Colors } from "../../../../constants/theme";
import { HeaderShopsBack } from "../../../../components/HeaderShopsBack";
import { Button } from "../../../../components/Btn";

import { useLocalSearchParams, useRouter } from "expo-router";
import { auth, db } from "../../../../utils/firebase";
import { doc, deleteDoc } from "firebase/firestore";
import { useState } from "react";

export default function deleteItem() {
  const userId = auth.currentUser?.uid;
  const route = useRouter();
  const [loading, setLoading] = useState(false);
  const productId = useLocalSearchParams<{ id: string }>().id;
  const shopId = useLocalSearchParams<{ shopId: string }>().shopId;

  const handleDeleteItem = async () => {
    console.log("Mi UID actual es:", userId);

    if (!userId) {
      return route.replace("/(auth)/login");
    }
    if (!productId) {
      return;
    }
    setLoading(true);
    try {
      console.log("productId:", productId);
      console.log("shopId:", shopId);
      await deleteDoc(doc(db, "products", productId));
      console.log("Product deleted successfully");
      route.replace(`/(tabs)/shops/${shopId}`);
    } catch (error) {
      console.error("Error deleting product: ", error);
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
          <Text style={styles.title}>Eliminar Item</Text>
          <Text style={styles.subtitle}>
            ¿Estás seguro de querer eliminar este Item? Este es un proceso
            irreversible...
          </Text>
        </View>
        <Button
          title="ELIMINAR"
          backgroundColor={Colors.dark.error}
          onPress={handleDeleteItem}
          disabled={loading}
        />
        <Button
          title="CANCELAR"
          backgroundColor={Colors.dark.success}
          onPress={() => {
            route.back();
          }}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: Colors.dark.background,
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
    color: Colors.dark.text,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    fontFamily: "Sen_400Regular",
    color: Colors.dark.textMuted,
    textAlign: "center",
  },
});
