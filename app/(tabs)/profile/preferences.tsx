import { View, StyleSheet, Alert } from "react-native";
import { Colors } from "../../../constants/theme";
import { HeaderShopsBack } from "../../../components/HeaderShopsBack";
import { ProfileAction } from "../../../components/ProfileAction";
import { useState } from "react";
import { useTheme } from "../../../contexts/ThemeContext";
import * as Notifications from "expo-notifications";

export default function Preferences() {
  const [newOrders, setNewOrders] = useState(false);
  const [inactiveShops, setInactiveShops] = useState(false);
  const [updates, setUpdates] = useState(false);
  const { colors } = useTheme();
  const styles = getStyles(colors);

  const toggleNotifications = async (value: boolean) => {
    if (!value) {
      setInactiveShops(false);
      await Notifications.cancelAllScheduledNotificationsAsync();
      return;
    }
    await Notifications.setNotificationChannelAsync("default", {
      name: "Recordatorios",
      importance: Notifications.AndroidImportance.DEFAULT,
    });

    const { status } = await Notifications.requestPermissionsAsync();

    if (status !== "granted") {
      setInactiveShops(false);
      return Alert.alert(
        "Permiso denegado",
        "No se puede activar las notificaciones.",
      );
    }
    await Notifications.cancelAllScheduledNotificationsAsync();
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "🛒 Despensa Lista",
        body: "Revisa tu lista de compras de hoy!",
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DAILY,
        hour: 22,
        minute: 18,
      },
    });
    setInactiveShops(true);
  };

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
            nameAction="Recordatorio Diario"
            toggle={true}
            value={inactiveShops}
            onValueChange={toggleNotifications}
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
