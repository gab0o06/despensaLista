import Entypo from "@expo/vector-icons/Entypo";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Colors } from "../constants/theme";

export const TodayActivity = () => {
  return (
    <View style={styles.todayActivityContainer}>
      <View style={styles.leftTodayElements}>
        <View style={styles.shopIcon}>
          <Entypo name="shop" size={24} color="white" />
        </View>
        <View>
          <Text style={styles.todayActTitle}>Carne</Text>
          <Text style={styles.todayActDescription}>Aki - 3 unidades</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.checkIcon} activeOpacity={0.5}>
        <Entypo name="check" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  todayActivityContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.dark.surface,
    borderRadius: 8,
    padding: 15,
  },
  leftTodayElements: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  shopIcon: {
    backgroundColor: Colors.dark.accent,
    borderRadius: 8,
    padding: 8,
  },
  todayActTitle: {
    fontFamily: "Sen_700Bold",
    fontSize: 16,
    color: Colors.dark.text,
  },
  todayActDescription: {
    fontFamily: "Sen_400Regular",
    fontSize: 14,
    color: Colors.dark.text,
  },
  checkIcon: {
    backgroundColor: "#C8C8C8",
    borderRadius: 8,
    padding: 4,
    marginRight: 10,
    opacity: 1,
  },
});
