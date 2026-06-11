import { View, StyleSheet, Text } from "react-native";

export const ShopCategory = () => {
  return (
    <View style={styles.categoryContainer}>
      <View style={styles.categoryImage}></View>
      <Text>Categoria 1</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  categoryContainer: {
    backgroundColor: "#727272",
    padding: 8,
    borderRadius: 32,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    minHeight: 60,
  },
  categoryImage: {
    width: 40,
    height: 40,
    backgroundColor: "#C4C4C4",
    borderRadius: 20,
  },
});
