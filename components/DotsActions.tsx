import { View, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter, type Href } from "expo-router";

import { Entypo } from "@expo/vector-icons";

import { Colors } from "../constants/theme";
import { useState } from "react";
import { useTheme } from "../contexts/ThemeContext";

interface DotsActionsProps {
  route: ReturnType<typeof useRouter>;
  pathEdit: Href;
  pathDelete: Href;
}

export const DotsActions = ({
  route,
  pathEdit,
  pathDelete,
}: DotsActionsProps) => {
  const [activeMoreFunctions, setActiveMoreFunctions] = useState(false);
  const { colors } = useTheme();
  const styles = getStyles(colors);

  return (
    <>
      <TouchableOpacity
        style={styles.actionDots}
        activeOpacity={0.7}
        onPress={() => setActiveMoreFunctions(!activeMoreFunctions)}
      >
        <Entypo name="dots-three-horizontal" size={16} color="white" />
      </TouchableOpacity>
      {activeMoreFunctions && (
        <View style={styles.moreFunctionsContainer}>
          <TouchableOpacity
            style={{
              padding: 10,
              backgroundColor: colors.accent,
              borderRadius: 8,
              marginBottom: 10,
            }}
            onPress={() => route.push(pathEdit)}
          >
            <Entypo name="pencil" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: colors.error,
              borderRadius: 8,
              padding: 10,
            }}
            onPress={() => route.push(pathDelete)}
          >
            <Entypo name="trash" size={24} color="white" />
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

const getStyles = (colors: typeof Colors.dark) =>
  StyleSheet.create({
    actionDots: {
      position: "absolute",
      right: 0,
      alignItems: "center",
      width: 30,
      height: 30,
      borderRadius: 8,
      justifyContent: "flex-end",
      backgroundColor: colors.secondary,
    },
    moreFunctionsContainer: {
      position: "absolute",
      top: 40,
      right: 0,
      borderRadius: 8,
      zIndex: 10,
    },
  });
