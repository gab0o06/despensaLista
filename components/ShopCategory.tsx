import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Colors } from "../constants/theme";

interface ShopCategoryProps {
  name: string;
  image: string;
  isPressed?: boolean;
  onPress?: () => void;
}

export const ShopCategory = ({
  name,
  image,
  isPressed,
  onPress,
}: ShopCategoryProps) => {
  return (
    <TouchableOpacity
      style={
        isPressed
          ? [styles.categoryContainer, { backgroundColor: Colors.dark.accent }]
          : styles.categoryContainer
      }
      activeOpacity={0.7}
      onPress={onPress}
    >
      <View style={styles.categoryImage}>
        <Text style={styles.categoryImageText}>{image}</Text>
      </View>
      <Text style={styles.categoryName}>{name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  categoryContainer: {
    backgroundColor: Colors.dark.surface,
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
    backgroundColor: Colors.dark.textMuted,
    borderRadius: 20,
  },
  categoryImageText: {
    color: Colors.dark.background,
    textAlign: "center",
    lineHeight: 40,
  },
  categoryName: {
    color: Colors.dark.text,
    fontSize: 16,
    fontWeight: "bold",
    paddingRight: 10,
  },
});
