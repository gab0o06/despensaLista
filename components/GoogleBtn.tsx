import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { Image } from "expo-image";
import { Colors } from "../constants/theme";

export const GoogleBtn = () => {
  return (
    <TouchableOpacity style={styles.googleBtn}>
      <Text style={styles.googleBtnText}>LOG IN CON GOOGLE</Text>
      <Image
        source={require("../assets/googleIcon.svg")}
        style={styles.googleBtnIcon}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  googleBtn: {
    backgroundColor: "#FFFFFF12",
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 12,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  googleBtnText: {
    color: Colors.dark.text,
    fontFamily: "Sen_700Bold",
    fontSize: 16,
  },
  googleBtnIcon: {
    width: 40,
    height: 40,
  },
});
