import { View, ScrollView, StyleSheet, Alert } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";

import { Colors } from "../../../constants/theme";
import { HeaderShopsBack } from "../../../components/HeaderShopsBack";
import { FormText } from "../../../components/FormText";
import { Button } from "../../../components/Btn";
import { auth, db } from "../../../utils/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

export default function createShop() {
  const [nameShop, setNameShop] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleCreateShop = async () => {
    if (
      !nameShop ||
      !category ||
      !description ||
      nameShop.trim() === "" ||
      category.trim() === "" ||
      description.trim() === ""
    )
      return Alert.alert(
        "All fields are required",
        "Please fill in all the fields to create your shop.",
      );

    const user = auth.currentUser;
    if (!user) {
      return Alert.alert(
        "Not Authenticated",
        "You need to be logged in to create a shop.",
      );
    }
    setLoading(true);

    try {
      await addDoc(collection(db, "shops"), {
        members: [user.uid],
        name: nameShop,
        category,
        description,
        createdAt: serverTimestamp(),
        lastActivity: serverTimestamp(),
      });
      router.back();
      console.log("Shop created successfully");
    } catch (error) {
      console.error("Error creating shop:", error);
      Alert.alert(
        "Error",
        "An error occurred while creating your shop. Please try again later.",
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
        <HeaderShopsBack
          title="Crear Tienda"
          subtitle="Ingresa los datos de tu tienda"
        />
      </View>
      <View style={styles.formContainer}>
        <FormText
          label="NAME"
          placeholder="Nombre Tienda"
          value={nameShop}
          onChangeText={setNameShop}
        />
        <FormText
          label="CATEGORY"
          placeholder="Categoría"
          value={category}
          onChangeText={setCategory}
        />
        <FormText
          label="DESCRIPTION"
          placeholder="Descripción"
          value={description}
          onChangeText={setDescription}
          maxLength={100}
        />
        <Button
          title={loading ? "Creating..." : "Create Shop"}
          backgroundColor={Colors.dark.secondary}
          onPress={handleCreateShop}
          disabled={loading}
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
    marginBottom: 120,
  },
});
