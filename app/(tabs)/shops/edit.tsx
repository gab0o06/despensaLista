import { View, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { Colors } from "../../../constants/theme";
import { HeaderShopsBack } from "../../../components/HeaderShopsBack";
import { FormText } from "../../../components/FormText";
import { Button } from "../../../components/Btn";
import { useState } from "react";

export default function editShop() {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode="on-drag"
      style={styles.body}
    >
      <View>
        <HeaderShopsBack
          title="Editar Tienda"
          subtitle="Ingresa los cambios de tu tienda"
        />
      </View>
      <View style={styles.formContainer}>
        <FormText label="NAME" placeholder="Nombre Tienda" />
        <FormText label="CATEGORY" placeholder="Categoría" />
        <FormText label="DESCRIPTION" placeholder="Descripción" />
        <Button
          title="SAVE"
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
