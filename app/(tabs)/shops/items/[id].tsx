import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import {
  useRouter,
  useFocusEffect,
  useLocalSearchParams,
  router,
} from "expo-router";
import { useCallback, useState } from "react";
import { doc, getDoc, Timestamp, updateDoc } from "firebase/firestore";

import { HeaderShopsBack } from "../../../../components/HeaderShopsBack";
import { Colors } from "../../../../constants/theme";
import { getTime, isLengthValid } from "../../../../utils/validators";
import { db } from "../../../../utils/firebase";
import { Button } from "../../../../components/Btn";
import { DotsActions } from "../../../../components/DotsActions";
import { useTheme } from "../../../../contexts/ThemeContext";

interface Product {
  id: string;
  agotado: boolean;
  cantidad: number;
  category: string;
  createdAt: Timestamp;
  creator: string;
  lastActivity: Timestamp;
  name: string;
  precio: number;
  recurrence: string;
  shopId: string;
  diaCompra?: string;
}

export default function ItemTemplateInfo() {
  const route = useRouter();
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState<number>(0);
  const productId = useLocalSearchParams<{ id: string }>().id;
  const shopName = useLocalSearchParams<{ shopName: string }>().shopName;

  const { colors } = useTheme();
  const styles = getStyles(colors);

  const days: Record<string, string> = {
    L: "Lunes",
    M: "Martes",
    Mi: "Miércoles",
    J: "Jueves",
    V: "Viernes",
    S: "Sábado",
    D: "Domingo",
  };

  useFocusEffect(
    useCallback(() => {
      const productInfo = async () => {
        setLoading(true);

        try {
          const productDoc = await getDoc(doc(db, "products", productId));
          if (productDoc.exists()) {
            const productData = productDoc.data();
            setProduct(productData as Product);
            setQuantity(productData.cantidad);
          }
        } catch (err) {
          console.error("Error fetching products data:", err);
        } finally {
          setLoading(false);
        }
      };
      productInfo();
      return () => {};
    }, [productId]),
  );

  if (loading) {
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

  const handleSaveChanges = async () => {
    try {
      setUpdating(true);
      const productRef = doc(db, "products", productId);
      await updateDoc(productRef, {
        cantidad: quantity,
        lastActivity: Timestamp.now(),
      });
      router.back();
    } catch (err) {
      console.error("Error updating product data:", err);
      Alert.alert("Error", "Error updating product data. Please try again.");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.body}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <HeaderShopsBack />
      <View>
        <View style={styles.headerContainer}>
          <View style={styles.headerShopInfo}>
            <View style={styles.imageContainer}>
              <Entypo name="shop" size={60} color="white" />
            </View>
            <View>
              <Text style={styles.shopName}>
                {product?.name && isLengthValid(product?.name, 8)}
              </Text>
              <View
                style={{ flexDirection: "row", gap: 10, alignItems: "center" }}
              >
                <Text style={styles.descShop}>{product?.category} </Text>
                <Text style={styles.descShop}>
                  ${product?.precio?.toFixed(2) || "0.00"}
                </Text>
              </View>
              <Text style={styles.descShop}>
                Tienda · {shopName && isLengthValid(shopName, 10)}
              </Text>
            </View>
          </View>
          <DotsActions
            route={route}
            pathEdit={`/(tabs)/shops/items/edit?id=${productId}`}
            pathDelete={`/(tabs)/shops/items/delete?id=${productId}&shopId=${product?.shopId}`}
          />
        </View>
      </View>
      <View style={styles.productContainer}>
        <View style={styles.productInfoContainer}>
          <Text style={styles.productInfoTitle}>Recurrencia</Text>
          <Text style={styles.productInfoTitle}>Precio</Text>
          <Text style={styles.productInfoTitle}>Día de compra</Text>
          <Text style={styles.productInfoTitle}>Ultima act.</Text>
        </View>
        <View style={[styles.productInfoContainer, { gap: 40, marginTop: 6 }]}>
          <Text style={styles.productInfoText}>{product?.recurrence}</Text>
          <Text style={styles.productInfoText}>
            ${product?.precio?.toFixed(2) || "0.00"}
          </Text>
          <Text style={styles.productInfoText}>
            {product?.recurrence === "Semanal" && product?.diaCompra
              ? days[product?.diaCompra] || "N/A"
              : "N/A"}
          </Text>
          <Text style={styles.productInfoText}>
            {getTime(product?.lastActivity)}
          </Text>
        </View>
      </View>
      <View style={styles.actionUnitsContainer}>
        <TouchableOpacity
          style={styles.actionUnit}
          onPress={() => {
            if (quantity > 0) {
              setQuantity(quantity - 1);
            }
          }}
        >
          <Text style={styles.actionUnitText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.actionUnitText}>
          {quantity.toString()} Unidades
        </Text>
        <TouchableOpacity
          style={styles.actionUnit}
          onPress={() => {
            if (quantity < 999) {
              setQuantity(quantity + 1);
            } else {
              Alert.alert(
                "Cantidad máxima alcanzada",
                "No puedes agregar más de 999 unidades.",
              );
            }
          }}
        >
          <Text style={styles.actionUnitText}>+</Text>
        </TouchableOpacity>
      </View>
      <Button
        title={updating ? "GUARDANDO..." : "GUARDAR CAMBIOS"}
        backgroundColor={colors.action}
        disabled={updating}
        onPress={handleSaveChanges}
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
      paddingBottom: 105,
    },
    headerContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginVertical: 20,
    },
    headerShopInfo: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
    },
    imageContainer: {
      width: 100,
      height: 100,
      borderRadius: 50,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.accentText,
    },
    shopName: {
      fontSize: 34,
      fontWeight: "bold",
      color: colors.text,
    },
    descShop: {
      fontSize: 16,
      color: colors.searchText,
    },
    actionDots: {
      alignItems: "center",
      width: 30,
      height: 30,
      borderRadius: 8,
      justifyContent: "flex-end",
      backgroundColor: colors.action,
    },
    moreFunctionsContainer: {
      position: "absolute",
      top: 40,
      right: 0,
      borderRadius: 8,
      zIndex: 10,
    },
    productContainer: {
      flexDirection: "row",
      marginVertical: 20,
      paddingHorizontal: 10,
      paddingVertical: 30,
      gap: 20,
      borderColor: colors.elementBackground,
      borderTopWidth: 2,
      borderBottomWidth: 2,
    },
    productInfoContainer: {
      flexDirection: "column",
      justifyContent: "flex-start",
      marginBottom: 10,
      gap: 30,
    },
    productInfoTitle: {
      fontSize: 24,
      color: colors.text,
      fontFamily: "Sen_700Bold",
    },
    productInfoText: {
      fontSize: 16,
      color: colors.searchText,
      fontFamily: "Sen_700Bold",
    },
    actionUnitsContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 16,
      marginBottom: 16,
      marginTop: 0,
    },
    actionUnit: {
      width: 40,
      height: 40,
      borderRadius: 8,
      backgroundColor: colors.action,
      alignItems: "center",
      justifyContent: "center",
    },
    actionUnitText: {
      fontSize: 20,
      color: colors.text,
      fontFamily: "Sen_400Regular",
    },
  });
