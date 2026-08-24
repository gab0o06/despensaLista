import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
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
import { doc, getDoc, Timestamp } from "firebase/firestore";
import { db } from "../../../utils/firebase";

interface Shop {
  members: string[];
  name: string;
  category: string;
  description: string;
  createdAt: Timestamp;
  lastActivity: Timestamp;
}

export default function ShopTemplateInfo() {
  const route = useRouter();
  const [shop, setShop] = useState<Shop | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeMoreFunctions, setActiveMoreFunctions] = useState(false);
  const shopId = useLocalSearchParams<{ id: string }>().id;

  const shopInfo = async () => {
    const shopDoc = await getDoc(doc(db, "shops", shopId));

    if (shopDoc.exists()) {
      const shopData = shopDoc.data();
      console.log("Shop Data:", shopData);
      setShop(shopData as Shop);
    }
  };

  useFocusEffect(
    useCallback(() => {
      setActiveMoreFunctions(false);

      shopInfo();
      setLoading(false);
      return () => {};
    }, []),
  );

  if (loading) {
    return (
      <View style={styles.body}>
        <HeaderShopsBack title="Tienda Cargando..." />
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color={Colors.dark.secondary} />
        </View>
      </View>
    );
  }

  const getTime = (timestamp?: Timestamp | null) => {
    if (!timestamp) return "Calculando...";

    const now = new Date();
    const pastDate = timestamp.toDate();
    const diffInMs = now.getTime() - pastDate.getTime();

    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));

    if (diffInMinutes < 1) return "Hace unos segundos";
    if (diffInMinutes < 60) return `Hace ${diffInMinutes} min`;

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `Hace ${diffInHours} h`;

    const diffInDays = Math.floor(diffInHours / 24);
    return `Hace ${diffInDays} d`;
  };

  return (
    <View style={styles.body}>
      <HeaderShopsBack />
      <View>
        <View style={styles.headerContainer}>
          <View style={styles.headerShopInfo}>
            <View style={styles.imageContainer}>
              <Entypo name="shop" size={60} color="white" />
            </View>
            <View>
              <Text style={styles.shopName}>{shop?.name}</Text>
              <Text style={styles.descShop}>0 productos agregados</Text>
              <Text style={styles.descShop}>
                Ult. Actualización: {getTime(shop?.lastActivity)}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.actionDots}
            activeOpacity={0.7}
            onPress={() => setActiveMoreFunctions(!activeMoreFunctions)}
          >
            <Entypo name="dots-three-horizontal" size={16} color="white" />
          </TouchableOpacity>
          {activeMoreFunctions && (
            <View style={styles.moreFunctionsContainer}>
              <TouchableOpacity
                style={{
                  padding: 10,
                  backgroundColor: Colors.dark.accent,
                  borderRadius: 8,
                  marginBottom: 10,
                }}
                onPress={() => route.push(`/(tabs)/shops/edit?id=${shopId}`)}
              >
                <Entypo name="pencil" size={24} color="black" />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: Colors.dark.error,
                  borderRadius: 8,
                  padding: 10,
                }}
                onPress={() => route.push(`/(tabs)/shops/delete?id=${shopId}`)}
              >
                <Entypo name="trash" size={24} color="white" />
              </TouchableOpacity>
            </View>
          )}
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
        <View style={{ marginVertical: 20 }}>
          <ItemShop
            category="Todos"
            name="Producto 1"
            units="kg"
            quantity={3}
          />
        </View>
      </View>
      <Link
        href={{
          pathname: "/(tabs)/shops/items/create",
          params: { shopId: shopId },
        }}
        asChild
      >
        <TouchableOpacity style={styles.addShopBtn} activeOpacity={0.8}>
          <Entypo name="plus" size={24} color={Colors.dark.bar} />
        </TouchableOpacity>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: Colors.dark.background,
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
    backgroundColor: Colors.dark.accent,
  },
  shopName: {
    fontSize: 34,
    fontWeight: "bold",
    color: "white",
  },
  descShop: {
    fontSize: 16,
    color: "#D9D9D9",
  },
  actionDots: {
    alignItems: "center",
    width: 30,
    height: 30,
    borderRadius: 8,
    justifyContent: "flex-end",
    backgroundColor: Colors.dark.secondary,
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
    borderColor: Colors.dark.search,
  },
  categoryText: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
  },
  activeCategoryItem: {
    color: Colors.dark.success,
    backgroundColor: "#D9D9D922",
    borderColor: Colors.dark.success,
  },
  activeCategoryText: {
    color: Colors.dark.success,
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
    backgroundColor: Colors.dark.secondary,
    borderRadius: 16,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
});
