import { View, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { Colors } from "../../../constants/theme";
import { HeaderShopsBack } from "../../../components/HeaderShopsBack";
import { Shop } from "../../../components/Shop";
import { Entypo } from "@expo/vector-icons";
import { Link } from "expo-router";

export default function myShops() {
  return (
    <View style={styles.body}>
      <HeaderShopsBack
        title="Mis tiendas"
        subtitle="Visualizar todas tus tiendas."
      />
      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
      >
        <Shop />
        <Shop />
        <Shop />
        <Shop />
        <Shop />
        <View style={{ height: 80 }} />
      </ScrollView>
      <Link href="/(tabs)/shops/create" asChild>
        <TouchableOpacity style={styles.addShopBtn} activeOpacity={0.8}>
          <Entypo name="plus" size={24} color={Colors.dark.bar} />
        </TouchableOpacity>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: Colors.dark.background,
    paddingHorizontal: 20,
  },
  addShopBtn: {
    position: "absolute",
    bottom: 80,
    right: 20,
    zIndex: 10,
    backgroundColor: Colors.dark.secondary,
    borderRadius: 16,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
});
