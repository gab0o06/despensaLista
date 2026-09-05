import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Entypo from "@expo/vector-icons/Entypo";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { Colors } from "../constants/theme";
import { useRouter } from "expo-router";
import { useTheme } from "../contexts/ThemeContext";

interface ShopProps {
  id: string;
  name: string;
  description: string;
  members: string[];
  category: string;
  createdAt: Date;
  lastActivity: Date;
}

const categoryIcons: Record<string, keyof typeof MaterialIcons.glyphMap> = {
  Moda: "checkroom",
  Tecnologia: "devices",
  Alimentos: "local-grocery-store",
  Hogar: "home",
  Belleza: "spa",
  Deportes: "sports-soccer",
};

export const Shop = ({
  id,
  name,
  description,
  lastActivity,
  category,
}: ShopProps) => {
  const { colors } = useTheme();
  const router = useRouter();
  const styles = getStyles(colors);
  const iconName = categoryIcons[category] || "storefront";

  const formatDate = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 60) return `${Math.abs(minutes)} min ago`;
    if (hours < 24) return `${Math.abs(hours)} h ago`;
    return `${Math.abs(days)} days ago`;
  };

  return (
    <TouchableOpacity
      style={styles.shopContainer}
      activeOpacity={0.8}
      onPress={() => router.push(`/(tabs)/shops/${id}`)}
    >
      <View style={styles.imageContainer}>
        <MaterialIcons name={iconName} size={50} color="white" />
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

const getStyles = (colors: typeof Colors.dark) =>
  StyleSheet.create({
    shopContainer: {
      backgroundColor: colors.surface,
      borderRadius: 10,
      padding: 20,
      marginBottom: 20,
      flexDirection: "row",
      gap: 10,
    },
    imageContainer: {
      backgroundColor: colors.accent,
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
      color: colors.textMuted,
    },
  });
