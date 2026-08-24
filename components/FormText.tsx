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
  type?: "text" | "desc" | "password" | "number" | "price";
  label?: string;
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  maxLength?: number;
}

export const FormText = ({
  type,
  label,
  placeholder,
  value,
  maxLength,
  onChangeText,
}: FormTextProps) => {
  const [active, setActive] = useState(false);
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>{label}</Text>
      <View style={styles.inputTextContainer}>
        <TextInput
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={type === "password" ? !active : false}
          maxLength={maxLength}
          keyboardType={
            type === "price"
              ? "decimal-pad"
              : type === "number"
                ? "numeric"
                : "default"
          }
          style={[
            styles.inputText,
            (type === "desc" && styles.descriptionChange) || {},
          ]}
          multiline={type === "desc"}
          textAlignVertical={type === "desc" ? "top" : "center"}
          placeholderTextColor={Colors.dark.textMuted}
        />
        {type === "password" ? (
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
    flex: 1,
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
