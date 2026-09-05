import { View, StyleSheet, TextInput } from "react-native";
import { Colors } from "../constants/theme";
import { Fontisto } from "@expo/vector-icons";
import { useTheme } from "../contexts/ThemeContext";

interface SearchInputProps {
  placeholder?: string;
}

export const SearchInput = ({ placeholder }: SearchInputProps) => {
  const { colors } = useTheme();
  const styles = getStyles(colors);
  return (
    <View style={styles.searchContainer}>
      <Fontisto name="search" size={24} color="white" />
      <TextInput
        placeholder={placeholder}
        style={styles.searchInput}
        placeholderTextColor={colors.textMuted}
      />
    </View>
  );
};

const getStyles = (colors: typeof Colors.dark) =>
  StyleSheet.create({
    searchContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-start",
      backgroundColor: colors.search,
      borderRadius: 8,
      gap: 10,
      paddingHorizontal: 15,
      overflow: "scroll",
    },
    searchInput: {
      flex: 1,
      color: colors.text,
      borderRadius: 8,
      paddingVertical: 10,
    },
  });
