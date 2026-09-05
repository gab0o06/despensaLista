import { View, Text, StyleSheet } from "react-native";
import { Image } from "expo-image";
import { Colors } from "../constants/theme";
import { useTheme } from "../contexts/ThemeContext";

export const HeaderUserActions = (props: {
  title: string;
  subtitle: string;
}) => {
  const { colors } = useTheme();
  const styles = getStyles(colors);
  return (
    <View style={styles.header}>
      <Image
        source={require("../assets/LogoApp.svg")}
        style={{ width: 100, height: 100, marginBottom: 20 }}
      />
      <Text style={styles.title}>{props.title}</Text>
      <Text style={styles.subtitle}>{props.subtitle}</Text>
    </View>
  );
};

const getStyles = (colors: typeof Colors.dark) =>
  StyleSheet.create({
    header: {
      alignItems: "center",
      marginTop: 40,
      marginBottom: 30,
    },
    title: {
      fontSize: 28,
      fontFamily: "Sen_700Bold",
      color: colors.text,
      marginBottom: 8,
    },
    subtitle: {
      fontSize: 14,
      fontFamily: "Sen_400Regular",
      color: colors.textMuted,
    },
  });
