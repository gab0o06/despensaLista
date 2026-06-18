import { View, StyleSheet, TextInput } from "react-native";
import { Colors } from "../constants/theme";
import { Fontisto } from "@expo/vector-icons";

interface SearchInputProps {
  placeholder?: string;
}

export const SearchInput = ({ placeholder }: SearchInputProps) => {
  return (
    <View style={styles.searchContainer}>
      <Fontisto name="search" size={24} color="white" />
      <TextInput
        placeholder={placeholder}
        style={styles.searchInput}
        placeholderTextColor={Colors.dark.textMuted}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: Colors.dark.search,
    borderRadius: 8,
    gap: 10,
    paddingHorizontal: 15,
    overflow: "scroll",
  },
  searchInput: {
    flex: 1,
    color: Colors.dark.text,
    borderRadius: 8,
    paddingVertical: 10,
  },
});
