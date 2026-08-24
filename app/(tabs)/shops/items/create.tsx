import {
  View,
  ScrollView,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Text,
} from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

import { Colors } from "../../../../constants/theme";
import { HeaderShopsBack } from "../../../../components/HeaderShopsBack";
import { FormText } from "../../../../components/FormText";
import { Button } from "../../../../components/Btn";
import { auth, db } from "../../../../utils/firebase";
import { categories } from "../../../../constants/shopCategories";

export default function createItem() {
  const [nameItem, setNameItem] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [recurrence, setRecurrence] = useState("");
  const [price, setPrice] = useState("");
  const [dayShopping, setDayShopping] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleCreateItem = async () => {
    if (
      !nameItem ||
      !category ||
      nameItem.trim() === "" ||
      category.trim() === ""
    )
      return Alert.alert(
        "All fields are required",
        "Please fill in all the fields to create your item.",
      );

    const user = auth.currentUser;
    if (!user) {
      return Alert.alert(
        "Not Authenticated",
        "You need to be logged in to create a item.",
      );
    }
    setLoading(true);

    try {
      //   await addDoc(collection(db, "shops"), {
      //     members: [user.uid],
      //     name: nameShop,
      //     category,
      //     description,
      //     createdAt: serverTimestamp(),
      //     lastActivity: serverTimestamp(),
      //   });
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
          title="Crear item"
          subtitle="Ingresa los datos del nuevo Item"
        />
      </View>
      <View style={styles.formContainer}>
        <FormText
          type="text"
          label="NAME"
          placeholder="Item name"
          value={nameItem}
          onChangeText={setNameItem}
        />
        <View style={styles.inputContainer}>
          <FormText
            type="text"
            label="CATEGORY"
            placeholder="Item category"
            value={category}
            onChangeText={setCategory}
          />
          <FormText
            type="number"
            label="QUANTITY"
            placeholder="Item quantity"
            value={quantity.toString()}
            onChangeText={(text) => setQuantity(Number(text))}
          />
        </View>
        <View style={styles.inputContainer}>
          <FormText
            type="text"
            label="RECURRENCIA"
            placeholder="Semanal"
            value={recurrence}
            onChangeText={setRecurrence}
          />
          <FormText
            type="price"
            label="PRECIO"
            placeholder="$0.00"
            value={price}
            onChangeText={(text) => {
              let formattedText = text.replace(/,/g, ".");
              formattedText = formattedText.replace(/[^0-9.]/g, "");

              const parts = formattedText.split(".");
              if (parts.length > 2) {
                formattedText = parts[0] + "." + parts.slice(1).join("");
              }

              setPrice(formattedText);
            }}
          />
        </View>
        <FormText
          type="text"
          label="DIA DE COMPRA"
          placeholder="Lunes"
          value={dayShopping}
          onChangeText={setDayShopping}
        />

        <Button
          title={loading ? "Creating..." : "CREATE ITEM"}
          backgroundColor={Colors.dark.secondary}
          onPress={handleCreateItem}
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
  inputContainer: {
    flexDirection: "row",
    gap: 24,
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
  },
  inputLabel: {
    color: Colors.dark.text,
    fontFamily: "Sen_400Regular",
    fontSize: 16,
  },
  inputTextContainer: {
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 8,
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    gap: 10,
  },

  categoryItem: {
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.dark.secondary,
    alignItems: "center",
    justifyContent: "center",
  },
  categoryText: {
    color: "#888",
    fontFamily: "Sen_400Regular",
    fontSize: 14,
  },
  categoryTextSelected: {
    color: Colors.dark.text,
    fontFamily: "Sen_700Bold",
  },
});
