import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Colors } from "../constants/theme";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";

interface FormTextProps {
  label?:
    | "EMAIL"
    | "USERNAME"
    | "PASSWORD"
    | "CONFIRM PASSWORD"
    | "NAME"
    | "CATEGORY"
    | "DESCRIPTION";
  placeholder?: string;
}

export const FormText = ({ label, placeholder }: FormTextProps) => {
  const [active, setActive] = useState(false);
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>{label}</Text>
      <View style={styles.inputTextContainer}>
        <TextInput
          placeholder={placeholder}
          secureTextEntry={
            label === "PASSWORD" || label === "CONFIRM PASSWORD"
              ? !active
              : false
          }
          style={[
            styles.inputText,
            (label === "DESCRIPTION" && styles.descriptionChange) || {},
          ]}
          multiline={label === "DESCRIPTION"}
          textAlignVertical={label === "DESCRIPTION" ? "top" : "center"}
          placeholderTextColor={Colors.dark.textMuted}
        />
        {label === "PASSWORD" || label === "CONFIRM PASSWORD" ? (
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => {
              setActive(!active);
            }}
          >
            <Ionicons
              name={active ? "eye" : "eye-off"}
              size={24}
              color={Colors.dark.textMuted}
            />
          </TouchableOpacity>
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
    flex: 1,
    color: Colors.dark.text,
    fontFamily: "Sen_400Regular",
    fontSize: 16,
  },
  descriptionChange: {
    height: 120,
  },
});
