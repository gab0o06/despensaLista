import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Colors } from "../constants/theme";
import { Entypo } from "@expo/vector-icons";
import { Link } from "expo-router";
import { useTheme } from "../contexts/ThemeContext";

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
  name,
  price,
  quantity,
  shopName,
}: ItemShopProps) => {
  const { colors } = useTheme();
  const styles = getStyles(colors);

  if (!id) {
    return (
      <View style={styles.mainItemsListContainer}>
        <Text style={{ color: "white" }}>No hay productos disponibles.</Text>
      </View>
    );
  }
  return (
    <Link
      href={{ pathname: `/shops/items/[id]`, params: { id, shopName } }}
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
                <Entypo name="chevron-right" size={40} color={colors.icons} />
              </View>
            </View>
          )}
        </View>
      </TouchableOpacity>
    </Link>
  );
};

const getStyles = (colors: typeof Colors.dark) =>
  StyleSheet.create({
    mainItemsListContainer: {
      marginVertical: 10,
      gap: 12,
    },

    mainItemContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      backgroundColor: colors.elementBackground,
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
      backgroundColor: colors.search,
      alignItems: "center",
      justifyContent: "center",
    },
    mainItemName: {
      fontSize: 20,
      color: colors.text,
      fontFamily: "Sen_700Bold",
    },
    mainItemPrice: {
      fontSize: 14,
      color: colors.searchText,
    },
  });
