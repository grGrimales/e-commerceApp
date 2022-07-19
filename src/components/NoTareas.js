import React from "react";

import { StyleSheet, Text } from "react-native";

export const NoTareas = () => {
  return <Text style={styles.noTareas}>No Tienes Pendientes aún</Text>;
};

const styles = StyleSheet.create({
  noTareas: {
    marginTop: 40,
    textAlign: "center",
    fontSize: 24,
    fontWeight: "600",
  },
});
