import Entypo from "@expo/vector-icons/Entypo";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { Colors } from "../constants/theme";
import { useRouter } from "expo-router";

interface ShopProps {
  id: string;
  name: string;
  description: string;
  members: string[];
  category: string;
  createdAt: Date;
  lastActivity: Date;
}

export const Shop = ({
  id,
  name,
  description,
  lastActivity,
  createdAt,
  members,
}: ShopProps) => {
  const router = useRouter();

  const formatDate = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 60) return `${minutes} min ago`;
    if (hours < 24) return `${hours} h ago`;
    return `${days} d ago`;
  };

  return (
    <TouchableOpacity
      style={styles.shopContainer}
      activeOpacity={0.8}
      onPress={() => router.push(`/(tabs)/shops/${id}`)}
    >
      <View style={styles.imageContainer}>
        <Entypo name="shop" size={50} color="white" />
      </View>
      <View style={styles.txtContainer}>
        <Text style={styles.shopName} numberOfLines={1}>
          {name}
        </Text>
        <Text style={styles.shopDescription} numberOfLines={1}>
          {description}
        </Text>
        <Text style={styles.shopDescription}>
          Ult. Act: {formatDate(lastActivity)}
        </Text>
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
