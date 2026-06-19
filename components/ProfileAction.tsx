import { Entypo } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Colors } from "../constants/theme";

interface ProfileActionProps {
  icon?: "user" | "mail" | "bell" | "moon";
  nameAction?: string;
  onPress?: () => void;
}

export const ProfileAction = ({
  icon,
  nameAction,
  onPress,
}: ProfileActionProps) => {
  return (
    <TouchableOpacity
      style={styles.mainActionContainer}
      activeOpacity={0.7}
      onPress={onPress}
    >
      <View style={styles.mainActionInfoContainer}>
        <View
          style={
            nameAction === "Log Out"
              ? styles.logOutActionImgContainer
              : styles.mainActionImgContainer
          }
        >
          <Feather name={icon} size={24} color="white" />
        </View>
        <View>
          <Text style={styles.mainActionName}>{nameAction}</Text>
        </View>
      </View>
      <View>
        <Entypo name="chevron-right" size={40} color="white" />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mainCategoryText: {
    fontSize: 20,
    color: "white",
  },
  mainActionContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: Colors.dark.surface,
    borderRadius: 8,
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  mainActionInfoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 15,
  },
  mainActionImgContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#535353",
    alignItems: "center",
    justifyContent: "center",
  },
  mainActionName: {
    fontSize: 24,
    color: "white",
    fontFamily: "Sen_700Bold",
  },
  logOutActionImgContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.dark.surface,
    alignItems: "center",
    justifyContent: "center",
  },
});
