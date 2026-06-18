import Entypo from "@expo/vector-icons/Entypo";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { Colors } from "../constants/theme";
import { useRouter } from "expo-router";

export const Shop = () => {
  const router = useRouter();
  return (
    <TouchableOpacity
      style={styles.shopContainer}
      activeOpacity={0.8}
      onPress={() => router.push("/(tabs)/shops/[id]")}
    >
      <View style={styles.imageContainer}>
        <Entypo name="shop" size={50} color="white" />
      </View>
      <View style={styles.txtContainer}>
        <Text style={styles.shopName}>Aki</Text>
        <Text style={styles.shopDescription}>10 productos agregados</Text>
        <Text style={styles.shopDescription}>Ult. Actualización: 3 min</Text>
      </View>
      <View style={styles.infoContainer}>
        <Entypo name="chevron-right" size={40} color="white" />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  shopContainer: {
    backgroundColor: Colors.dark.surface,
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    flexDirection: "row",
    gap: 10,
  },
  imageContainer: {
    backgroundColor: Colors.dark.accent,
    borderRadius: 10,
    width: 80,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
  },

  infoContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  txtContainer: {
    flex: 1,
    justifyContent: "center",
    gap: 2,
  },
  shopName: {
    fontSize: 24,
    fontFamily: "Sen_700Bold",
    color: "white",
  },
  shopDescription: {
    fontSize: 14,
    fontFamily: "Sen_400Regular",
    color: Colors.dark.textMuted,
  },
});
