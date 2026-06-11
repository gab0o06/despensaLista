import Feather from "@expo/vector-icons/Feather";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { Colors } from "../constants/theme";

export const SeeAllBtn = (props: { title?: string | "See All" }) => {
  return (
    <TouchableOpacity style={styles.container}>
      <Text style={styles.seeAll}>{props.title || "See All"}</Text>
      <Feather name="chevron-right" size={20} color={Colors.dark.text} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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
