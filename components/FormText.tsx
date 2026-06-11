import { View, Text, TextInput, StyleSheet } from "react-native";
import { Colors } from "../constants/theme";
import Ionicons from "@expo/vector-icons/Ionicons";

interface FormTextProps {
  label?: "EMAIL" | "USERNAME" | "PASSWORD" | "CONFIRM PASSWORD";
  placeholder?: string;
}

export const FormText = ({ label, placeholder }: FormTextProps) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>{label}</Text>
      <View style={styles.inputTextContainer}>
        <TextInput
          placeholder={placeholder}
          style={styles.inputText}
          placeholderTextColor={Colors.dark.textMuted}
        />
        {label === "PASSWORD" || label === "CONFIRM PASSWORD" ? (
          <Ionicons name="eye" size={24} color={Colors.dark.textMuted} />
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    gap: 16,
  },
  inputLabel: {
    color: Colors.dark.text,
    fontFamily: "Sen_400Regular",
    fontSize: 16,
  },
  inputTextContainer: {
    backgroundColor: Colors.dark.search,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  inputText: {
    color: Colors.dark.text,
    fontFamily: "Sen_400Regular",
    fontSize: 16,
  },
});
