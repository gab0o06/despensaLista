import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { Colors } from "../constants/theme";
import { useTheme } from "../contexts/ThemeContext";

interface ButtonProps {
  title: string;
  onPress: () => void;
  backgroundColor?: string;
  textColor?: string;
  disabled?: boolean;
}

export const Button = ({
  title,
  onPress,
  backgroundColor,
  textColor,
  disabled,
}: ButtonProps) => {
  const { colors } = useTheme();
  const styles = getStyles(colors);
  return (
    <TouchableOpacity
      style={[styles.primaryButton, backgroundColor && { backgroundColor }]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text
        style={[styles.primaryButtonText, textColor && { color: textColor }]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const getStyles = (colors: typeof Colors.dark) =>
  StyleSheet.create({
    primaryButton: {
      backgroundColor: colors.action,
      paddingVertical: 24,
      borderRadius: 8,
      alignItems: "center",
      marginTop: 10,
    },
    primaryButtonText: {
      color: colors.action,
      fontSize: 16,
      fontFamily: "Sen_700Bold",
    },
  });
