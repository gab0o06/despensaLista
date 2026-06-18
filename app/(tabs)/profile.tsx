import { View, Text, StyleSheet } from "react-native";
import { Colors } from "../../constants/theme";
import { HeaderShopsBack } from "../../components/HeaderShopsBack";
import { Entypo } from "@expo/vector-icons";
import { ProfileAction } from "../../components/ProfileAction";

export default function Profile() {
  return (
    <View style={styles.body}>
      <HeaderShopsBack
        title="Tu cuenta"
        subtitle="Configura tu cuenta y preferencias."
      />
      <View>
        <View style={styles.mainItemsListContainer}>
          <ProfileAction icon="user" nameAction="Username" />
          <ProfileAction icon="mail" nameAction="Email" />
          <ProfileAction icon="bell" nameAction="Notifications" />
          <ProfileAction icon="moon" nameAction="Dark mode" />
        </View>
        <ProfileAction nameAction="Log Out" />
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
