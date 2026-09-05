import Feather from "@expo/vector-icons/Feather";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { useTheme } from "../contexts/ThemeContext";

export const SeeAllBtn = (props: { title?: string | "See All" }) => {
  const { colors } = useTheme();
  const styles = getStyles();
  return (
    <TouchableOpacity style={styles.container}>
      <Text style={styles.seeAll}>{props.title || "See All"}</Text>
      <Feather name="chevron-right" size={20} color={colors.text} />
    </TouchableOpacity>
  );
};

const getStyles = () =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      gap: 5,
    },
    seeAll: {
      fontFamily: "Sen_400Regular",
      fontSize: 16,
      color: "#78C94C",
    },
  });
