import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
  Alert,
} from "react-native";
import { Colors } from "../constants/theme";
import { Entypo } from "@expo/vector-icons";
import { useTheme } from "../contexts/ThemeContext";
import { useState } from "react";

interface InviteMembersProps {
  handleInvitation: (email: string) => void;
  invitingMember: boolean;
  isAdmin: boolean;
}

export const InviteMembers = ({
  handleInvitation,
  invitingMember,
  isAdmin,
}: InviteMembersProps) => {
  const [mailInput, setMailInput] = useState("");

  const { colors } = useTheme();
  const styles = getStyles(colors);

  const onSubmit = () => {
    if (!mailInput.trim() || invitingMember) return;

    handleInvitation(mailInput.trim());
    setMailInput("");
  };

  return (
    <View style={styles.inviteMembersActionContainer}>
      <View style={styles.searchContainer}>
        <Entypo name="mail" size={24} color={colors.icons} />
        <TextInput
          placeholder="Correo del usuario"
          style={styles.searchInput}
          placeholderTextColor={colors.searchText}
          value={mailInput}
          onChangeText={setMailInput}
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
          editable={isAdmin}
        />
      </View>
      <TouchableOpacity
        style={styles.primaryButton}
        onPress={onSubmit}
        disabled={invitingMember || !isAdmin}
      >
        <Text style={styles.primaryButtonText}>INVITAR</Text>
      </TouchableOpacity>
    </View>
  );
};

const getStyles = (colors: typeof Colors.dark) =>
  StyleSheet.create({
    inviteMembersActionContainer: {
      flexDirection: "row",
      alignContent: "center",
      gap: 10,
      marginTop: 10,
    },
    searchContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-start",
      backgroundColor: colors.search,
      borderRadius: 8,
      gap: 10,
      paddingHorizontal: 10,
      width: "70%",
      height: 50,
    },
    searchInput: {
      color: colors.text,
      borderRadius: 8,
      flex: 1,
    },
    primaryButton: {
      flex: 1,
      backgroundColor: colors.action,
      borderRadius: 12,
      alignItems: "center",
      justifyContent: "center",
    },
    primaryButtonText: {
      color: colors.text,
      fontSize: 12,
      fontFamily: "Sen_700Bold",
    },
  });
