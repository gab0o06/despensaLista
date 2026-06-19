import { View, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { Colors } from "../../../constants/theme";
import { HeaderShopsBack } from "../../../components/HeaderShopsBack";
import { Shop } from "../../../components/Shop";
import { Entypo } from "@expo/vector-icons";
import { Link } from "expo-router";
import { auth, db } from "../../../utils/firebase";
import {
  collection,
  doc,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";

interface ShopData {
  id: string;
  name: string;
  description: string;
  members: string[];
  category: string;
  createdAt: Date;
  lastActivity: Date;
}

export default function myShops() {
  const [shops, setShops] = useState<ShopData[]>([]);

  useEffect(() => {
    const userId = auth.currentUser?.uid;
    if (!userId) return;

    const q = query(
      collection(db, "shops"),
      where("members", "array-contains", userId),
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => {
        const docData = doc.data();
        return {
          id: doc.id,
          ...docData,
          createdAt: docData.createdAt?.toDate() ?? new Date(),
          lastActivity: docData.lastActivity?.toDate() ?? new Date(),
        };
      }) as ShopData[];
      setShops(data);
    });

    return unsubscribe;
  }, []);

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
        {shops.map((shop) => (
          <Shop key={shop.id} {...shop} />
        ))}
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
