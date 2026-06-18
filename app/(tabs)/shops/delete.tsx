import { View, ScrollView, StyleSheet, Text } from "react-native";
import { Colors } from "../../../constants/theme";
import { HeaderShopsBack } from "../../../components/HeaderShopsBack";
import { Button } from "../../../components/Btn";

const { useRouter } = require("expo-router");

export default function editShop() {
  const route = useRouter();
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode="on-drag"
      style={styles.body}
    >
      <View>
        <HeaderShopsBack />
      </View>
      <View style={styles.formContainer}>
        <View style={styles.txtContainer}>
          <Text style={styles.title}>Eliminar Tienda</Text>
          <Text style={styles.subtitle}>
            ¿Estás seguro de querer eliminar la tienda? Este es un proceso
            irreversible...
          </Text>
        </View>
        <Button
          title="ELIMINAR"
          backgroundColor={Colors.dark.error}
          onPress={() => {
            route.push("/(tabs)/shops");
          }}
        />
        <Button
          title="CANCELAR"
          backgroundColor={Colors.dark.success}
          onPress={() => {
            route.back();
          }}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: Colors.dark.background,
    paddingHorizontal: 20,
  },
  formContainer: {
    gap: 16,
    justifyContent: "center",
    marginTop: 100,
    marginBottom: 120,
  },
  txtContainer: {
    marginBottom: 20,
    flexDirection: "column",
    alignContent: "center",
  },
  title: {
    fontSize: 40,
    fontFamily: "Sen_700Bold",
    color: Colors.dark.text,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    fontFamily: "Sen_400Regular",
    color: Colors.dark.textMuted,
    textAlign: "center",
  },
});
