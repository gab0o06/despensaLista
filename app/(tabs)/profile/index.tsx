import { View, StyleSheet } from "react-native";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { signOut } from "firebase/auth";

import { Colors } from "../../../constants/theme";
import { HeaderShopsBack } from "../../../components/HeaderShopsBack";
import { ProfileAction } from "../../../components/ProfileAction";
import { auth } from "../../../utils/firebase";
import { useRouter } from "expo-router";
import { useState } from "react";

export default function Profile() {
  const [activeDarkMode, setActiveDarkMode] = useState(false);

  const router = useRouter();

  const handleLogOut = async () => {
    try {
      await GoogleSignin.signOut();
      await signOut(auth);
      router.replace("/(auth)/login");
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <View style={styles.body}>
      <HeaderShopsBack
        title="Tu cuenta"
        subtitle="Configura tu cuenta y preferencias."
      />
      <View>
        <View style={styles.mainItemsListContainer}>
          <ProfileAction
            icon="user"
            nameAction="Username"
            onPress={() => {
              router.push("/(tabs)/profile/username");
            }}
          />
          <ProfileAction
            icon="mail"
            nameAction="Email"
            onPress={() => {
              router.push("/(tabs)/profile/email");
            }}
          />
          <ProfileAction
            icon="bell"
            nameAction="Notifications"
            onPress={() => {
              router.push("/(tabs)/profile/preferences");
            }}
          />
          <ProfileAction
            icon="moon"
            nameAction="Dark mode"
            toggle={true}
            value={activeDarkMode}
            onValueChange={(value) => setActiveDarkMode(value)}
          />
        </View>
        <ProfileAction nameAction="Log Out" onPress={handleLogOut} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: Colors.dark.background,
    paddingHorizontal: 20,
  },
  mainItemsListContainer: {
    marginTop: 10,
    marginBottom: 30,
    gap: 12,
  },
});
