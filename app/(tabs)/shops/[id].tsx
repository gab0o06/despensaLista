import { View, StyleSheet, Text, TextInput } from "react-native";
import { HeaderShopsBack } from "../../../components/HeaderShopsBack";
import { Colors } from "../../../constants/theme";
import { Entypo, Fontisto } from "@expo/vector-icons";
import { SearchInput } from "../../../components/SearchInput";

export default function ShopTemplateInfo() {
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
          <View style={styles.actionDots}>
            <Entypo name="dots-three-horizontal" size={16} color="white" />
          </View>
        </View>
        <View style={{ gap: 20 }}>
          <View style={styles.categoriesContainer}>
            <View style={[styles.categoryItem, styles.activeCategoryItem]}>
              <Text style={styles.categoryText}>Todos</Text>
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
});
