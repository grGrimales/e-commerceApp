import React from "react";

import { StyleSheet, FlatList } from "react-native";
import Tareas from "./Tareas";

export const Listado = ({
  tareas,
  setModalVisible,
  tareaEditar,
  tareaEliminar,
}) => {
  return (
    <FlatList
      style={styles.listado}
      data={tareas}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => {
        return (
          <Tareas
            item={item}
            setModalVisible={setModalVisible}
            tareaEditar={tareaEditar}
            tareaEliminar={tareaEliminar}
          />
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  listado: {
    marginTop: 50,
    marginHorizontal: 30,
  },
});
