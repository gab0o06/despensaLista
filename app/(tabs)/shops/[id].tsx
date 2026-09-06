import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import {
  useRouter,
  useFocusEffect,
  useLocalSearchParams,
  Link,
} from "expo-router";
import { useCallback, useState } from "react";

import { HeaderShopsBack } from "../../../components/HeaderShopsBack";
import { Colors } from "../../../constants/theme";
import { SearchInput } from "../../../components/SearchInput";
import { ItemShop } from "../../../components/ItemShop";
import { DotsActions } from "../../../components/DotsActions";
import {
  doc,
  getDoc,
  Timestamp,
  where,
  query,
  collection,
  getDocs,
} from "firebase/firestore";
import { auth, db } from "../../../utils/firebase";
import { getTime, isLengthValid } from "../../../utils/validators";
import { useTheme } from "../../../contexts/ThemeContext";

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
}

export default function ShopTemplateInfo() {
  const route = useRouter();
  const [shop, setShop] = useState<Shop | null>(null);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[] | null>([]);
  const shopId = useLocalSearchParams<{ id: string }>().id;
  const { colors } = useTheme();
  const styles = getStyles(colors);

  useFocusEffect(
    useCallback(() => {
      const shopInfo = async () => {
        setLoading(true);

        try {
          const userId = auth.currentUser?.uid;
          if (!userId) {
            console.error("User is not authenticated.");
            return;
          }

          const shopDoc = await getDoc(doc(db, "shops", shopId));
          if (shopDoc.exists()) {
            const shopData = shopDoc.data();
            setShop(shopData as Shop);
          }

          const queryp = query(
            collection(db, "products"),
            where("shopId", "==", shopId),
            where("members", "array-contains", userId),
          );

          const querySnapshot = await getDocs(queryp);

          const productData = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          setProducts(productData as Product[]);
        } catch (err) {
          console.error("Error fetching products data:", err);
        } finally {
          setLoading(false);
        }
      };

      shopInfo();
      return () => {};
    }, [shopId]),
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

  return (
    <View style={styles.body}>
      <HeaderShopsBack />
      <View style={{ flex: 1 }}>
        <View style={styles.headerContainer}>
          <View style={styles.headerShopInfo}>
            <View style={styles.imageContainer}>
              <Entypo name="shop" size={60} color="white" />
            </View>
            <View>
              <Text style={styles.shopName}>
                {shop?.name && isLengthValid(shop?.name, 8)}
              </Text>
              <Text style={styles.descShop}>0 productos agregados</Text>
              <Text style={styles.descShop}>
                Ult. Actualización: {getTime(shop?.lastActivity)}
              </Text>
            </View>
          </View>
          <DotsActions
            route={route}
            pathEdit={`/(tabs)/shops/edit?id=${shopId}`}
            pathDelete={`/(tabs)/shops/delete?id=${shopId}`}
          />
        </View>
        <View style={{ gap: 20 }}>
          <View style={styles.categoriesContainer}>
            <View style={[styles.categoryItem, styles.activeCategoryItem]}>
              <Text style={[styles.categoryText, styles.activeCategoryText]}>
                Todos
              </Text>
            </View>
            <View style={styles.categoryItem}>
              <Text style={styles.categoryText}>Carne</Text>
            </View>
            <View style={styles.categoryItem}>
              <Text style={styles.categoryText}>Lácteos</Text>
            </View>
            <View style={styles.categoryItem}>
              <Text style={styles.categoryText}>Aña</Text>
            </View>
          </View>
          <SearchInput placeholder="Search" />
        </View>

        <Text style={styles.mainCategoryText}>Todos</Text>
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}
        >
          {products?.map((product) => (
            <ItemShop
              key={product.id}
              id={product.id}
              category={product.category}
              name={product.name}
              price={product.precio}
              quantity={product.cantidad}
              shopName={shop?.name}
            />
          ))}
        </ScrollView>
      </View>
      <Link
        href={{
          pathname: "/(tabs)/shops/items/create",
          params: { shopId: shopId },
        }}
        asChild
      >
        <TouchableOpacity style={styles.addShopBtn} activeOpacity={0.8}>
          <Entypo name="plus" size={24} color={colors.barMenu} />
        </TouchableOpacity>
      </Link>
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
    headerContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginVertical: 20,
    },
    headerShopInfo: {
      flexDirection: "row",
      alignItems: "center",
      gap: 15,
    },
    imageContainer: {
      width: 90,
      height: 90,
      borderRadius: 16,
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
    categoriesContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 10,
    },
    categoryItem: {
      paddingVertical: 10,
      paddingHorizontal: 16,
      borderRadius: 24,
      borderWidth: 2,
      borderColor: colors.elementBackground,
    },
    categoryText: {
      color: colors.text,
      fontSize: 16,
      fontWeight: "700",
    },
    activeCategoryItem: {
      color: colors.success,
      backgroundColor: "#D9D9D922",
      borderColor: colors.success,
    },
    activeCategoryText: {
      color: colors.success,
    },
    moreFunctionsContainer: {
      position: "absolute",
      top: 40,
      right: 0,
      borderRadius: 8,
      zIndex: 10,
    },
    addShopBtn: {
      position: "absolute",
      bottom: 80,
      right: 20,
      zIndex: 10,
      backgroundColor: colors.action,
      borderRadius: 16,
      width: 60,
      height: 60,
      justifyContent: "center",
      alignItems: "center",
    },
    mainCategoryText: {
      fontSize: 20,
      color: colors.text,
      marginTop: 10,
    },
    container: {
      flexGrow: 1,
      paddingBottom: 150,
      backgroundColor: colors.background,
      justifyContent: "center",
    },
  });
