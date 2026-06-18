import { View, StyleSheet, Text } from "react-native";
import { Colors } from "../constants/theme";
import { Entypo } from "@expo/vector-icons";

interface ItemShopProps {
  category?: string;
  name?: string;
  units?: string;
  quantity?: number;
}

export const ItemShop = ({
  category,
  name,
  units,
  quantity,
}: ItemShopProps) => {
  return (
    <View>
      <Text style={styles.mainCategoryText}>{category}</Text>
      <View style={styles.mainItemsListContainer}>
        {quantity && quantity > 0 && (
          <View style={styles.mainItemContainer}>
            <View style={styles.mainItemInfoContainer}>
              <View style={styles.mainItemImgContainer}>
                <Entypo name="bowl" size={34} color="#C0C0C0" />
              </View>
              <View>
                <Text style={styles.mainItemName}>{name}</Text>
                <Text style={styles.mainItemUnits}>{units}</Text>
              </View>
            </View>
            <View>
              <Entypo name="chevron-right" size={40} color="white" />
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainItemsListContainer: {
    marginVertical: 10,
    gap: 12,
  },

  mainCategoryText: {
    fontSize: 20,
    color: "white",
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
  mainItemUnits: {
    fontSize: 14,
    color: "#D9D9D9",
  },
});
