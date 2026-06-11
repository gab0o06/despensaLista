import { Text, View, StyleSheet, TextInput, ScrollView } from "react-native";
import { Colors } from "../../constants/theme";
import { Image } from "expo-image";
import Fontisto from "@expo/vector-icons/Fontisto";

import { SeeAllBtn } from "../../components/SeeAllbtn";
import { TodayActivity } from "../../components/TodayActivity";
import { ShopCategory } from "../../components/ShopCategory";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <View style={[styles.header, styles.paddingScreen]}>
        <Image
          source={require("../../assets/LogoApp.svg")}
          style={{ width: 60, height: 60 }}
        />
        <Fontisto
          name="bell-alt"
          size={24}
          color="white"
          style={{ marginRight: 10 }}
        />
      </View>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
      >
        <View style={[{ gap: 20 }, styles.paddingScreen]}>
          <Text style={styles.title}>
            <Text style={{ color: Colors.dark.accent }}>Hi</Text> USER, Good
            Afternoon!
          </Text>
          <View style={styles.searchContainer}>
            <Fontisto
              name="search"
              size={24}
              color="white"
              // style={{ marginLeft: 15 }}
            />
            <TextInput
              placeholder="Search Shop and Activities"
              style={styles.searchInput}
              placeholderTextColor={Colors.dark.textMuted}
            />
          </View>
        </View>
        <View>
          <View style={[styles.shop, styles.paddingScreen]}>
            <Text style={styles.title}>Shop</Text>
            <SeeAllBtn />
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              gap: 16,
              flexDirection: "row",
              paddingLeft: 20,
            }}
          >
            <ShopCategory />
            <ShopCategory />
            <ShopCategory />
            <ShopCategory />
          </ScrollView>
        </View>
        <View style={styles.paddingScreen}>
          <View style={styles.shop}>
            <Text style={styles.title}>Today's Shop</Text>
            <SeeAllBtn />
          </View>
          <View style={{ gap: 16 }}>
            <TodayActivity />
            <TodayActivity />
            <TodayActivity />
            <TodayActivity />
            <TodayActivity />
            <TodayActivity />
            <TodayActivity />
            <TodayActivity />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    paddingTop: 32,
    backgroundColor: Colors.dark.background,
  },
  paddingScreen: {
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },

  content: {
    flexDirection: "column",
    gap: 20,
    marginTop: 32,
    paddingBottom: 150,
  },
  title: {
    fontFamily: "Sen_400Regular",
    fontSize: 20,
    color: Colors.dark.text,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: Colors.dark.search,
    borderRadius: 8,
    gap: 10,
    paddingHorizontal: 15,
    overflow: "scroll",
  },
  searchInput: {
    flex: 1,
    color: Colors.dark.text,
    borderRadius: 8,
    paddingVertical: 10,
  },
  shop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
});
