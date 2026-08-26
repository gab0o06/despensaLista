import { Text, View, StyleSheet, ScrollView } from "react-native";
import { Colors } from "../../constants/theme";
import { Image } from "expo-image";
import Fontisto from "@expo/vector-icons/Fontisto";

import { SeeAllBtn } from "../../components/SeeAllbtn";
import { TodayActivity } from "../../components/TodayActivity";
import { ShopCategory } from "../../components/ShopCategory";
import { SearchInput } from "../../components/SearchInput";
import { auth, db } from "../../utils/firebase";
import { categories } from "../../constants/shopCategories";
import { useCallback, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  Timestamp,
  doc,
  getDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { useFocusEffect } from "expo-router";

interface Shop {
  members: string[];
  name: string;
  category: string;
  description: string;
  createdAt: Timestamp;
  lastActivity: Timestamp;
}

interface Product {
  id: string;
  compradoEn?: Timestamp | null;
  cantidad: number;
  category: string;
  createdAt: Timestamp;
  creator: string;
  lastActivity: Timestamp;
  name: string;
  precio: number;
  recurrence: string;
  shopId: string;
  shopName: string | "";
  shopCategory: string | "";
}

export default function HomeScreen() {
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [productsToday, setProductsToday] = useState<Product[]>([]);
  const [username, setUsername] = useState<string>(
    auth.currentUser?.displayName || "User",
  );

  const fetchInfoProductsToday = async () => {
    setLoading(true);
    try {
      const userId = auth.currentUser?.uid;
      if (!userId) {
        console.error("User is not authenticated.");
        return;
      }

      const userRef = doc(db, "users", userId);
      const userSnapshot = await getDoc(userRef);

      if (!userSnapshot.exists()) {
        console.error("User document does not exist.");
        return;
      }

      const userData = userSnapshot.data();
      setUsername(userData?.username || "User");

      const time = new Date();
      const diaMes = time.getDate();
      const mes = time.getMonth();
      const hoy = time.getDay();
      const dias = ["D", "L", "M", "Mi", "J", "V", "S"];

      const recurrenciaValida = ["Diaria", dias[hoy]];

      if (diaMes === 1) {
        recurrenciaValida.push("Mensual");
      }

      if (diaMes === 1 && mes === 0) {
        recurrenciaValida.push("Anual");
      }

      const productsRef = collection(db, "products");
      const q = query(
        productsRef,
        where("members", "array-contains", userId),
        where("recurrence", "in", recurrenciaValida),
      );

      const querySnapshot = await getDocs(q);
      const products: Product[] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Product[];

      const productsWithShops = await Promise.all(
        products.map(async (product): Promise<Product> => {
          try {
            const shopRef = doc(db, "shops", product.shopId);
            const shopSnapshot = await getDoc(shopRef);

            if (shopSnapshot.exists()) {
              const shopData = shopSnapshot.data();
              return {
                ...product,
                shopName: shopData?.name || "Tienda desconocida",
                shopCategory: shopData?.category || "",
              };
            } else {
              return {
                ...product,
                shopName: "Tienda desconocida",
                shopCategory: "",
              };
            }
          } catch (error) {
            console.error(
              `Error fetching shop for product ${product.id}:`,
              error,
            );
            return { ...product, shopName: "Error", shopCategory: "" };
          }
        }),
      );
      setProductsToday(productsWithShops);
    } catch (err) {
      console.error("Error fetching products: ", err);
    } finally {
      setLoading(false);
    }
  };

  const fueCompradoHoy = (fechaCompra?: any) => {
    if (!fechaCompra) return false;
    let fecha: Date;

    if (fechaCompra._methodName === "serverTimestamp") {
      return true;
    }

    if (typeof fechaCompra.toDate === "function") {
      fecha = fechaCompra.toDate();
    } else if (fechaCompra.seconds) {
      fecha = new Date(fechaCompra.seconds * 1000);
    } else {
      return false;
    }

    const hoy = new Date();
    return (
      fecha.getDate() === hoy.getDate() &&
      fecha.getMonth() === hoy.getMonth() &&
      fecha.getFullYear() === hoy.getFullYear()
    );
  };

  const toggleCompradoHoy = async (productId: string, comprado: boolean) => {
    setProductsToday((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId
          ? {
              ...product,
              compradoEn: comprado ? null : Timestamp.now(),
            }
          : product,
      ),
    );

    try {
      const productRef = doc(db, "products", productId);
      await updateDoc(productRef, {
        compradoEn: comprado ? null : serverTimestamp(),
      });
    } catch (error) {
      console.error("Error updating product:", error);
      setProductsToday((prevProducts) =>
        prevProducts.map((product) =>
          product.id === productId
            ? {
                ...product,
                compradoEn: comprado ? Timestamp.now() : null,
              }
            : product,
        ),
      );
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchInfoProductsToday();
      return () => {};
    }, []),
  );
  return (
    <View style={styles.container}>
      <View style={[styles.header, styles.paddingScreen]}>
        <Image
          source={require("../../assets/LogoApp.svg")}
          style={{ width: 60, height: 60 }}
        />
        <Fontisto
          name="bell-alt"
          size={24}
          color="white"
          style={{ marginRight: 10 }}
        />
      </View>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
      >
        <View style={[{ gap: 20 }, styles.paddingScreen]}>
          <Text style={styles.title}>
            <Text style={{ color: Colors.dark.accent }}>Hi</Text> {username},
            Good Afternoon!
          </Text>
          <SearchInput placeholder="Search Shop and Activities" />
        </View>
        <View>
          <View style={[styles.shop, styles.paddingScreen]}>
            <Text style={styles.title}>Shop</Text>
            {/* <SeeAllBtn /> */}
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{
              gap: 16,
              flexDirection: "row",
              paddingLeft: 20,
            }}
          >
            {Object.values(categories).map((category) => (
              <ShopCategory
                key={category.id}
                name={category.name}
                image={category.icon}
                isPressed={activeCategory === category.id}
                onPress={() => {
                  if (activeCategory === category.id) {
                    setActiveCategory(null);
                  } else {
                    setActiveCategory(category.id);
                  }
                }}
              />
            ))}
          </ScrollView>
        </View>
        <View style={styles.paddingScreen}>
          <View style={styles.shop}>
            <Text style={styles.title}>Today's Shop</Text>
            <SeeAllBtn />
          </View>
          <View style={{ gap: 16 }}>
            {productsToday
              .filter((product) => {
                if (activeCategory === null) {
                  return true;
                }
                const selectedCategory = Object.values(categories).find(
                  (cat) => cat.id === activeCategory,
                );
                return product.shopCategory === selectedCategory?.name;
              })

              .map((product) => {
                const isChecked = fueCompradoHoy(product.compradoEn);
                return (
                  <TodayActivity
                    key={product.id}
                    title={product.name}
                    description={`${product.shopName.slice(0, 6)} - ${product.cantidad} unidades`}
                    isChecked={isChecked}
                    onPressCheck={() =>
                      toggleCompradoHoy(product.id, isChecked)
                    }
                  />
                );
              })}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    paddingTop: 32,
    backgroundColor: Colors.dark.background,
  },
  paddingScreen: {
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },

  content: {
    flexDirection: "column",
    gap: 20,
    marginTop: 32,
    paddingBottom: 150,
  },
  title: {
    fontFamily: "Sen_400Regular",
    fontSize: 20,
    color: Colors.dark.text,
  },

  shop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
});
