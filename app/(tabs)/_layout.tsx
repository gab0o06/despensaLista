import { Tabs } from "expo-router";
import { View, StyleSheet } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import * as Haptics from "expo-haptics";
import { Colors } from "../../constants/theme";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarLabelVisibilityMode: "unlabeled",
        tabBarStyle: styles.tabBar,
        animation: "fade",
        tabBarHideOnKeyboard: true,
      }}
      backBehavior="fullHistory"
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.iconContainer}>
              <Feather name="home" size={30} color="white" />
              {focused && <View style={styles.activeDot} />}
            </View>
          ),
          tabBarBadge: 3,
          tabBarAccessibilityLabel: "Home Tab",
        }}
        listeners={() => ({
          tabPress: () => {
            Haptics.selectionAsync();
          },
        })}
      />

      <Tabs.Screen
        name="cart"
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.floatingButton}>
              <Feather name="shopping-cart" size={30} color="white" />
            </View>
          ),
          tabBarAccessibilityLabel: "Cart Tab",
        }}
        listeners={() => ({
          tabPress: () => {
            Haptics.selectionAsync();
          },
        })}
      />

      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.iconContainer}>
              <Feather name="user" size={30} color="white" />
              {focused && <View style={styles.activeDot} />}
            </View>
          ),
          tabBarAccessibilityLabel: "Profile Tab",
        }}
        listeners={() => ({
          tabPress: () => {
            Haptics.selectionAsync();
          },
        })}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: Colors.dark.bar,
    height: 70,
    position: "absolute",
    bottom: 0,
    borderTopWidth: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "flex-end",
  },
  activeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#FFFFFF",
    marginTop: 2,
  },
  iconContainer: {
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  floatingButton: {
    top: -30,
    justifyContent: "center",
    alignItems: "center",
    width: 65,
    height: 65,
    borderRadius: 30,
    backgroundColor: Colors.dark.secondary,
    borderWidth: 10,
    borderColor: Colors.dark.bar,
  },
});
