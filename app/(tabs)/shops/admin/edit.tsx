import { useCallback, useState } from "react";
import { useRouter, useLocalSearchParams, useFocusEffect } from "expo-router";
import {
  View,
  ScrollView,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from "react-native";
import { updateDoc, serverTimestamp, doc, getDoc } from "firebase/firestore";

import { Colors } from "../../../../constants/theme";
import { HeaderShopsBack } from "../../../../components/HeaderShopsBack";
import { FormText } from "../../../../components/FormText";
import { Button } from "../../../../components/Btn";
import { auth, db } from "../../../../utils/firebase";
import { categories } from "../../../../constants/shopCategories";
import { useTheme } from "../../../../contexts/ThemeContext";

export default function EditShop() {
  const [nameShop, setNameShop] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const { colors } = useTheme();
  const styles = getStyles(colors);

  const id = useLocalSearchParams<{ id: string }>().id;

  const router = useRouter();

  const handleUpdateShop = async () => {
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
        "Please fill in all the fields to update your shop.",
      );

    const user = auth.currentUser;
    if (!user) {
      return Alert.alert(
        "Not Authenticated",
        "You need to be logged in to update a shop.",
      );
    }
    setLoading(true);

    try {
      await updateDoc(doc(db, "shops", id), {
        name: nameShop,
        category,
        description,
        lastActivity: serverTimestamp(),
      });
      router.back();
    } catch (error) {
      console.error("Error updating shop:", error);
      Alert.alert(
        "Error",
        "An error occurred while updating your shop. Please try again later.",
      );
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      const fetchShopData = async () => {
        setFetching(true);
        try {
          const shopDoc = await getDoc(doc(db, "shops", id));
          if (shopDoc.exists()) {
            const shopData = shopDoc.data();

            setNameShop(shopData.name || "");
            setCategory(shopData.category || "");
            setDescription(shopData.description || "");
          }
        } catch (error) {
          console.error("Error fetching shop data:", error);
        } finally {
          setFetching(false);
        }
      };
      if (id) {
        fetchShopData();
      }
      return () => {};
    }, [id]),
  );

  if (fetching) {
    return (
      <View style={styles.body}>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color={colors.action} />
        </View>
      </View>
    );
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode="on-drag"
      style={styles.body}
    >
      <View>
        <HeaderShopsBack
          title="Editar Tienda"
          subtitle="Ingresa los cambios de tu tienda"
        />
      </View>
      <View style={styles.formContainer}>
        <FormText
          type="text"
          label="NAME"
          placeholder="Nombre Tienda"
          value={nameShop}
          onChangeText={setNameShop}
        />
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>CATEGORY</Text>
          <View style={styles.inputTextContainer}>
            {Object.values(categories).map((item) => (
              <TouchableOpacity
                key={item.id}
                onPress={() => setCategory(item.name)}
                style={[
                  styles.categoryItem,
                  category === item.name && {
                    backgroundColor: colors.action,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.categoryText,
                    category === item.name && styles.categoryTextSelected,
                  ]}
                >
                  {item.icon} {item.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <FormText
          type="desc"
          label="DESCRIPTION"
          placeholder="Descripción"
          value={description}
          onChangeText={setDescription}
        />
        <Button
          title={loading ? "Updating..." : "Update Shop"}
          backgroundColor={colors.action}
          onPress={handleUpdateShop}
          disabled={loading}
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
      marginBottom: 120,
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
      borderColor: colors.action,
      alignItems: "center",
      justifyContent: "center",
    },
    categoryText: {
      color: colors.text,
      fontFamily: "Sen_400Regular",
      fontSize: 14,
    },
    categoryTextSelected: {
      color: colors.alternateText,
      fontFamily: "Sen_700Bold",
    },
  });
