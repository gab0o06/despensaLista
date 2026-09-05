import Entypo from "@expo/vector-icons/Entypo";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Colors } from "../constants/theme";
import { useTheme } from "../contexts/ThemeContext";

interface TodayActivityProps {
  title: string;
  description: string;
  isChecked?: boolean;
  onPressCheck?: () => void;
}

export const TodayActivity = ({
  title,
  description,
  isChecked,
  onPressCheck,
}: TodayActivityProps) => {
  const { colors } = useTheme();
  const styles = getStyles(colors);
  return (
    <View style={styles.todayActivityContainer}>
      <View style={styles.leftTodayElements}>
        <View style={styles.shopIcon}>
          <Entypo name="shop" size={24} color="white" />
        </View>
        <View>
          <Text style={styles.todayActTitle}>{title}</Text>
          <Text style={styles.todayActDescription}>{description}</Text>
        </View>
      </View>
      <TouchableOpacity
        style={[styles.checkIcon, isChecked && styles.checkedIcon]}
        activeOpacity={0.5}
        onPress={onPressCheck}
      >
        <Entypo name="check" size={24} color={isChecked ? "white" : "black"} />
      </TouchableOpacity>
    </View>
  );
};

const getStyles = (colors: typeof Colors.dark) =>
  StyleSheet.create({
    todayActivityContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: colors.elementBackground,
      borderRadius: 8,
      padding: 15,
    },
    leftTodayElements: {
      flexDirection: "row",
      alignItems: "center",
      gap: 15,
    },
    shopIcon: {
      backgroundColor: colors.accentText,
      borderRadius: 8,
      padding: 8,
    },
    todayActTitle: {
      fontFamily: "Sen_700Bold",
      fontSize: 16,
      color: colors.text,
    },
    todayActDescription: {
      fontFamily: "Sen_400Regular",
      fontSize: 14,
      color: colors.text,
    },
    checkIcon: {
      backgroundColor: "#C8C8C8",
      borderRadius: 8,
      padding: 4,
      marginRight: 10,
      opacity: 1,
    },
    checkedIcon: {
      backgroundColor: colors.accentText,
      opacity: 1,
    },
  });
