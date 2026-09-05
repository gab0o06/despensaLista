import Entypo from "@expo/vector-icons/Entypo";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Colors } from "../constants/theme";
import { useTheme } from "../contexts/ThemeContext";

interface HeaderShopsBackProps {
  title?: string;
  subtitle?: string;
}

export const HeaderShopsBack = ({ title, subtitle }: HeaderShopsBackProps) => {
  const { colors } = useTheme();
  const router = useRouter();
  const styles = getStyles(colors);
  return (
    <View>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.backBtn}
          activeOpacity={0.7}
          onPress={() => router.back()}
        >
          <Entypo name="chevron-left" size={30} color="black" />
        </TouchableOpacity>
        <Image
          source={require("../assets/LogoApp.svg")}
          style={{ width: 50, height: 50 }}
        />
      </View>
      {title && subtitle && (
        <View style={styles.txtContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>
      )}
    </View>
  );
};

const getStyles = (colors: typeof Colors.dark) =>
  StyleSheet.create({
    headerContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginVertical: 40,
      marginBottom: 20,
    },
    backBtn: {
      width: 50,
      height: 50,
      borderRadius: 30,
      backgroundColor: colors.text,
      justifyContent: "center",
      alignItems: "center",
    },
    txtContainer: {
      marginBottom: 20,
      flexDirection: "column",
      alignContent: "center",
    },
    title: {
      fontSize: 40,
      fontFamily: "Sen_700Bold",
      color: colors.text,
      textAlign: "center",
    },
    subtitle: {
      fontSize: 20,
      fontFamily: "Sen_400Regular",
      color: colors.textMuted,
      textAlign: "center",
    },
  });
