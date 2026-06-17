import { View, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { Colors } from "../../../constants/theme";
import { HeaderShopsBack } from "../../../components/HeaderShopsBack";
import { FormText } from "../../../components/FormText";
import { Button } from "../../../components/Btn";

export default function createShop() {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode="on-drag"
      style={styles.body}
    >
      <View>
        <HeaderShopsBack
          title="Crear Tienda"
          subtitle="Ingresa los datos de tu tienda"
        />
      </View>
      <View style={styles.formContainer}>
        <FormText label="NAME" placeholder="Nombre Tienda" />
        <FormText label="CATEGORY" placeholder="Categoría" />
        <FormText label="DESCRIPTION" placeholder="Descripción" />
        <Button
          title="CREATE"
          backgroundColor={Colors.dark.secondary}
          onPress={() => {}}
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
    marginBottom: 120,
  },
});
