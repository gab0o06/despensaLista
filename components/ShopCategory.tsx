import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Colors } from "../constants/theme";
import { useTheme } from "../contexts/ThemeContext";

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
  const { colors } = useTheme();
  const styles = getStyles(colors);
  return (
    <TouchableOpacity
      style={
        isPressed
          ? [styles.categoryContainer, { backgroundColor: colors.accentText }]
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

const getStyles = (colors: typeof Colors.dark) =>
  StyleSheet.create({
    categoryContainer: {
      backgroundColor: colors.elementBackground,
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
      backgroundColor: colors.searchText,
      borderRadius: 20,
    },
    categoryImageText: {
      color: colors.background,
      textAlign: "center",
      lineHeight: 40,
    },
    categoryName: {
      color: colors.text,
      fontSize: 16,
      fontWeight: "bold",
      paddingRight: 10,
    },
  });
