import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useTheme } from "../contexts/ThemeContext";
import { Colors } from "../constants/theme";
import Entypo from "@expo/vector-icons/Entypo";

interface MemberShopProps {
  alias: string;
  name: string;
  email: string;
  role: "ADMIN" | "MEMBER";
  isAdmin: boolean;
  onPressDelete?: () => void;
}

export const MemberShop = ({
  alias,
  name,
  email,
  role,
  isAdmin,
  onPressDelete,
}: MemberShopProps) => {
  const { colors } = useTheme();
  const styles = getStyles(colors);
  name = name.length > 12 ? name.substring(0, 8) + "..." : name;
  email = email.length > 15 ? email.substring(0, 15) + "..." : email;
  return (
    <View style={styles.memberContainer}>
      <View style={styles.memberInfoContainer}>
        <View style={styles.membersAliasContainer}>
          <Text style={styles.membersAlias}>{alias}</Text>
        </View>
        <View>
          <Text style={styles.memberName}>{name}</Text>
          <Text style={styles.memberEmail}>{email}</Text>
        </View>
      </View>
      <View style={styles.memberInfoContainer}>
        <View
          style={[
            styles.memberRoleContainer,
            {
              backgroundColor:
                role === "ADMIN" ? colors.accentText : colors.searchText,
            },
          ]}
        >
          <Text style={styles.memberRole}>{role}</Text>
        </View>
        {isAdmin && role === "MEMBER" ? (
          <TouchableOpacity
            style={styles.memberActionsContainer}
            onPress={onPressDelete}
          >
            <Entypo name="trash" size={20} color={colors.text} />
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
};

const getStyles = (colors: typeof Colors.dark) =>
  StyleSheet.create({
    memberContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: colors.elementBackground,
      paddingVertical: 8,
      paddingHorizontal: 15,
      borderRadius: 16,
    },
    membersAliasContainer: {
      width: 50,
      height: 50,
      borderRadius: 25,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.search,
    },
    membersAlias: {
      color: colors.text,
      fontSize: 25,
      fontFamily: "Sen_700Bold",
    },
    memberInfoContainer: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
    },
    memberName: {
      fontFamily: "Sen_700Bold",
      color: colors.text,
      fontSize: 20,
    },
    memberEmail: {
      color: colors.searchText,
      fontSize: 12,
    },
    memberRoleContainer: {
      backgroundColor: colors.accentText,
      paddingVertical: 5,
      paddingHorizontal: 10,
      borderRadius: 8,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },
    memberRole: {
      color: colors.text,
      fontFamily: "Sen_700Bold",
      fontSize: 12,
      paddingHorizontal: 5,
      paddingVertical: 2,
    },
    memberActionsContainer: {
      flexDirection: "row",
      gap: 10,
      width: 35,
      height: 35,
      borderRadius: 20,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.error,
    },
  });
