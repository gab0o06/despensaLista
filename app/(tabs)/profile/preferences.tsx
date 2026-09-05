import { View, StyleSheet } from "react-native";
import { Colors } from "../../../constants/theme";
import { HeaderShopsBack } from "../../../components/HeaderShopsBack";
import { ProfileAction } from "../../../components/ProfileAction";
import { useState } from "react";
import { useTheme } from "../../../contexts/ThemeContext";

export default function Preferences() {
  const [newOrders, setNewOrders] = useState(false);
  const [inactiveShops, setInactiveShops] = useState(false);
  const [updates, setUpdates] = useState(false);
  const { colors } = useTheme();
  const styles = getStyles(colors);

  return (
    <View style={styles.body}>
      <HeaderShopsBack
        title="Notifications"
        subtitle="Controla lo que recibes de nosotros."
      />
      <View>
        <View style={styles.mainItemsListContainer}>
          <ProfileAction
            icon="bullhorn"
            nameAction="Nuevos Pedidos"
            toggle={true}
            value={newOrders}
            onValueChange={setNewOrders}
          />
          <ProfileAction
            icon="bell"
            nameAction="Shops Inactivas"
            toggle={true}
            value={inactiveShops}
            onValueChange={setInactiveShops}
          />
          <ProfileAction
            icon="userFont"
            nameAction="Actualizaciones "
            toggle={true}
            value={updates}
            onValueChange={setUpdates}
          />
        </View>
      </View>
    </View>
  );
}

const getStyles = (colors: typeof Colors.dark) =>
  StyleSheet.create({
    body: {
      flex: 1,
      backgroundColor: colors.background,
      paddingHorizontal: 20,
    },
    mainItemsListContainer: {
      marginTop: 10,
      marginBottom: 30,
      gap: 12,
    },
  });
