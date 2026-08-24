import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Colors } from "../constants/theme";
import { Entypo } from "@expo/vector-icons";
import { Link } from "expo-router";

interface ItemShopProps {
  id?: string;
  category?: string;
  name?: string;
  price?: number;
  quantity?: number;
  shopName?: string;
}

export const ItemShop = ({
  id,
  category,
  name,
  price,
  quantity,
  shopName,
}: ItemShopProps) => {
  return (
    <Link
      href={{ pathname: `/shops/items/${id}`, params: { shopName } }}
      asChild
    >
      <TouchableOpacity>
        <View style={styles.mainItemsListContainer}>
          {quantity && quantity > 0 && (
            <View style={styles.mainItemContainer}>
              <View style={styles.mainItemInfoContainer}>
                <View style={styles.mainItemImgContainer}>
                  <Entypo name="bowl" size={34} color="#C0C0C0" />
                </View>
                <View>
                  <Text style={styles.mainItemName}>{name}</Text>
                  <Text style={styles.mainItemPrice}>
                    ${price?.toString()} - {quantity} unidades
                  </Text>
                </View>
              </View>
              <View>
                <Entypo name="chevron-right" size={40} color="white" />
              </View>
            </View>
          )}
        </View>
      </TouchableOpacity>
    </Link>
  );
};

const styles = StyleSheet.create({
  mainItemsListContainer: {
    marginVertical: 10,
    gap: 12,
  },

  mainItemContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: Colors.dark.surface,
    borderRadius: 8,
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  mainItemInfoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8,
  },
  mainItemImgContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.dark.search,
    alignItems: "center",
    justifyContent: "center",
  },
  mainItemName: {
    fontSize: 20,
    color: "white",
    fontFamily: "Sen_700Bold",
  },
  mainItemPrice: {
    fontSize: 14,
    color: "#D9D9D9",
  },
});
