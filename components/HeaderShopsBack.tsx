import Entypo from "@expo/vector-icons/Entypo";
import { Image } from "expo-image";
import { Link } from "expo-router/build/link/Link";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Colors } from "../constants/theme";

interface HeaderShopsBackProps {
  title?: string;
  subtitle?: string;
}

export const HeaderShopsBack = ({ title, subtitle }: HeaderShopsBackProps) => {
  return (
    <View>
      <View style={styles.headerContainer}>
        <Link href="/(tabs)/index" asChild>
          <TouchableOpacity style={styles.backBtn} activeOpacity={0.7}>
            <Entypo name="chevron-left" size={30} color="black" />
          </TouchableOpacity>
        </Link>
        <Image
          source={require("../assets/LogoApp.svg")}
          style={{ width: 50, height: 50 }}
        />
      </View>
      <View style={styles.txtContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
    backgroundColor: Colors.dark.text,
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
    color: Colors.dark.text,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 20,
    fontFamily: "Sen_400Regular",
    color: Colors.dark.textMuted,
    textAlign: "center",
  },
});
