import { View, StyleSheet } from "react-native";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { signOut } from "firebase/auth";

import { Colors } from "../../../constants/theme";
import { HeaderShopsBack } from "../../../components/HeaderShopsBack";
import { ProfileAction } from "../../../components/ProfileAction";
import { auth } from "../../../utils/firebase";
import { useRouter } from "expo-router/build/exports";

export default function Profile() {
  const router = useRouter();

  const handleLogOut = async () => {
    try {
      await GoogleSignin.signOut();
      await signOut(auth);
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
          <ProfileAction icon="bell" nameAction="Notifications" />
          <ProfileAction icon="moon" nameAction="Dark mode" />
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
