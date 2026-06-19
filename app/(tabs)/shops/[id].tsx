import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { useRouter, useFocusEffect, useLocalSearchParams } from "expo-router";

import { HeaderShopsBack } from "../../../components/HeaderShopsBack";
import { Colors } from "../../../constants/theme";
import { SearchInput } from "../../../components/SearchInput";
import { ItemShop } from "../../../components/ItemShop";
import { useCallback, useState } from "react";

export default function ShopTemplateInfo() {
  const route = useRouter();
  const [activeMoreFunctions, setActiveMoreFunctions] = useState(false);
  const shopId = useLocalSearchParams<{ id: string }>().id;

  useFocusEffect(
    useCallback(() => {
      setActiveMoreFunctions(false);

      return () => {};
    }, []),
  );

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
              <Text style={styles.shopName}>Aki</Text>
              <Text style={styles.descShop}>10 productos agregados</Text>
              <Text style={styles.descShop}>Ult. Actualización: 3 min</Text>
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
});
