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
import { useTheme } from "../contexts/ThemeContext";

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
  const { colors } = useTheme();
  const styles = getStyles(colors);
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
          placeholderTextColor={colors.searchText}
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
              color={colors.searchText}
            />
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
};

const getStyles = (colors: typeof Colors.dark) =>
  StyleSheet.create({
    inputContainer: {
      gap: 16,
    },
    inputLabel: {
      color: colors.text,
      fontFamily: "Sen_400Regular",
      fontSize: 16,
    },
    inputTextContainer: {
      backgroundColor: colors.search,
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderRadius: 8,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    inputText: {
      flex: 1,
      color: colors.text,
      fontFamily: "Sen_400Regular",
      fontSize: 16,
    },
    descriptionChange: {
      height: 120,
    },
  });
