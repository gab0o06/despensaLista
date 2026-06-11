import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { Colors } from "../constants/theme";

interface ButtonProps {
  title: string;
  onPress: () => void;
  backgroundColor?: string;
  textColor?: string;
}

export const Button = ({
  title,
  onPress,
  backgroundColor,
  textColor,
}: ButtonProps) => {
  return (
    <TouchableOpacity
      style={[styles.primaryButton, backgroundColor && { backgroundColor }]}
      onPress={onPress}
    >
      <Text
        style={[styles.primaryButtonText, textColor && { color: textColor }]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  primaryButton: {
    backgroundColor: Colors.dark.primary,
    paddingVertical: 24,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  primaryButtonText: {
    color: Colors.dark.text,
    fontSize: 16,
    fontFamily: "Sen_700Bold",
  },
});
