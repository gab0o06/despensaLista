import { Entypo, Feather } from "@expo/vector-icons";
import { View, Text, StyleSheet, TouchableOpacity, Switch } from "react-native";
import { Colors } from "../constants/theme";
import FontAwesome6 from "@expo/vector-icons/FontAwesome";
import { useTheme } from "../contexts/ThemeContext";

interface ProfileActionProps {
  icon?: "user" | "mail" | "bell" | "moon" | "userFont" | "bullhorn";
  nameAction?: string;
  toggle?: boolean;
  value?: boolean;
  onValueChange?: (value: boolean) => void;
  onPress?: () => void;
}

export const ProfileAction = ({
  icon,
  nameAction,
  toggle,
  value = false,
  onValueChange,
  onPress,
}: ProfileActionProps) => {
  const { colors } = useTheme();
  const styles = getStyles(colors);
  return (
    <TouchableOpacity
      style={styles.mainActionContainer}
      activeOpacity={toggle ? 1 : 0.7}
      onPress={toggle ? () => onValueChange?.(!value) : onPress}
    >
      <View style={styles.mainActionInfoContainer}>
        <View
          style={
            nameAction === "Log Out"
              ? styles.logOutActionImgContainer
              : styles.mainActionImgContainer
          }
        >
          {icon === "userFont" ? (
            <FontAwesome6 name="user" size={24} color={colors.text} />
          ) : icon === "bullhorn" ? (
            <FontAwesome6 name="bullhorn" size={24} color={colors.text} />
          ) : (
            <Feather name={icon} size={24} color={colors.text} />
          )}
        </View>
        <View>
          <Text style={styles.mainActionName}>{nameAction}</Text>
        </View>
      </View>
      <View>
        {toggle ? (
          <Switch
            value={value}
            onValueChange={onValueChange}
            trackColor={{ false: colors.text, true: colors.text }}
            thumbColor={value ? colors.searchText : colors.text}
          />
        ) : (
          <Entypo name="chevron-right" size={40} color={colors.text} />
        )}
      </View>
    </TouchableOpacity>
  );
};

const getStyles = (colors: typeof Colors.dark) =>
  StyleSheet.create({
    mainCategoryText: {
      fontSize: 20,
      color: colors.text,
    },
    mainActionContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      backgroundColor: colors.elementBackground,
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
      backgroundColor: colors.iconsUserColor,
      alignItems: "center",
      justifyContent: "center",
    },
    mainActionName: {
      fontSize: 20,
      color: colors.text,
      fontFamily: "Sen_700Bold",
    },
    logOutActionImgContainer: {
      width: 60,
      height: 60,
      borderRadius: 30,
      backgroundColor: colors.elementBackground,
      alignItems: "center",
      justifyContent: "center",
    },
  });
