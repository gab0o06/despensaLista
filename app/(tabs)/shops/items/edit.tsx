import {
  View,
  ScrollView,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Text,
} from "react-native";
import { useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

import { Colors } from "../../../../constants/theme";
import { HeaderShopsBack } from "../../../../components/HeaderShopsBack";
import { FormText } from "../../../../components/FormText";
import { Button } from "../../../../components/Btn";
import { auth, db } from "../../../../utils/firebase";

export default function editItem() {
  const [nameItem, setNameItem] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [recurrence, setRecurrence] = useState("");
  const [price, setPrice] = useState("");
  const [dayShopping, setDayShopping] = useState("");
  const [loading, setLoading] = useState(false);

  const productId = useLocalSearchParams<{ id: string }>().id;

  const router = useRouter();

  const recurrenceOptions = ["Diaria", "Semanal", "Mensual", "Anual"];
  const dayShoppingOptions = ["L", "M", "Mi", "J", "V", "S", "D"];

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

    if (!recurrence)
      return Alert.alert(
        "Falta información",
        "Por favor selecciona la recurrencia del item.",
      );

    const user = auth.currentUser;
    if (!user) {
      return Alert.alert(
        "Not Authenticated",
        "You need to be logged in to create a item.",
      );
    }
    setLoading(true);

    const finalPrice = price ? parseFloat(price) : 0;
    const finalQuantity = quantity ? parseInt(quantity, 10) : 0;

    try {
      const productRef = doc(db, "products", productId);
      await updateDoc(productRef, {
        name: nameItem,
        category,
        cantidad: finalQuantity,
        recurrence,
        agotado: finalQuantity === 0,
        precio: finalPrice,
        lastActivity: serverTimestamp(),
        diaCompra: recurrence === "Semanal" ? dayShopping : null,
      });
      router.back();
      console.log("Item edited successfully");
    } catch (error) {
      console.error("Error editing item:", error);
      Alert.alert(
        "Error",
        "An error occurred while editing your item. Please try again later.",
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
          title="Editar item"
          subtitle="Ingresa los datos de la actualización"
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
            placeholder="Ej: 5"
            value={quantity}
            onChangeText={(text) => {
              const numericText = text.replace(/[^0-9]/g, "");
              setQuantity(numericText);
            }}
          />
        </View>
        <View>
          <Text style={styles.inputLabel}>RECURRENCIA</Text>
          <View style={styles.optionsContainer}>
            {recurrenceOptions.map((option) => (
              <TouchableOpacity
                key={option}
                activeOpacity={0.7}
                onPress={() => setRecurrence(option)}
                style={[
                  styles.optionItem,
                  recurrence === option && styles.optionItemSelected,
                ]}
              >
                <Text style={styles.optionText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {recurrence === "Semanal" && (
          <View>
            <Text style={styles.inputLabel}>DIA DE COMPRA</Text>
            <View style={styles.optionsContainerDays}>
              {dayShoppingOptions.map((option) => (
                <TouchableOpacity
                  key={option}
                  activeOpacity={0.7}
                  onPress={() => setDayShopping(option)}
                  style={[
                    styles.optionItemCircle,
                    dayShopping === option && styles.optionItemSelected,
                  ]}
                >
                  <Text style={styles.optionText}>{option}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}
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
        <Button
          title={loading ? "Updating..." : "UPDATE ITEM"}
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
    gap: 16,
    alignItems: "center",
    justifyContent: "space-between",
  },
  inputLabel: {
    color: Colors.dark.text,
    fontFamily: "Sen_400Regular",
    fontSize: 16,
    marginBottom: 8,
  },

  fullWidth: {
    width: "100%",
  },
  optionsContainer: {
    flexDirection: "row",
    gap: 10,
    flexWrap: "wrap",
  },
  optionItem: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.dark.search,
    alignItems: "center",
    justifyContent: "center",
  },
  optionsContainerDays: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  optionItemCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 1,
    borderColor: Colors.dark.search,
    alignItems: "center",
    justifyContent: "center",
  },
  optionItemSelected: {
    backgroundColor: Colors.dark.secondary,
    borderColor: Colors.dark.secondary,
  },
  optionText: {
    color: Colors.dark.text,
    fontFamily: "Sen_400Regular",
    fontSize: 12,
  },
});
