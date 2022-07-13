import React, { useState } from "react";

import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Pressable,
  Modal,
  FlatList,
  Alert,
} from "react-native";

import Formulario from "./src/components/Formulario";
import Tareas from "./src/components/Tareas";

export default function App() {
  const [modalVisible, setModalVisible] = useState(false);
  const [tareas, setTareas] = useState([]);
  const [tarea, setTarea] = useState({});

  const tareaEditar = (id) => {
    const tareaEditar = tareas.filter((tarea) => tarea.id === id);
    setTarea(tareaEditar[0]);
  };

  const tareaEliminar = (id) => {
    Alert.alert(
      "¿Deseas eliminar este TO DO?",
      "Un TO DO eliminado no se puede recuperar",
      [
        { text: "Cancelar" },
        {
          text: "Si, Eliminar",
          onPress: () => {
            const tareasActualizadas = tareas.filter(
              (tareasState) => tareasState.id !== id
            );
            setTareas(tareasActualizadas);
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>¡Organiza tus Actividades!</Text>

      <Text style={styles.tituloBold}>¡To do!</Text>

      <Pressable
        style={styles.addToDo}
        onPress={() => setModalVisible(!modalVisible)}
      >
        <Text style={styles.textoBtn}> Nuevo To do</Text>
      </Pressable>

      {tareas.length === 0 ? (
        <Text style={styles.noTareas}>No Tienes Pendientes aún</Text>
      ) : (
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
      )}

      <Formulario
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        setTareas={setTareas}
        setTarea={setTarea}
        tareas={tareas}
        tarea={tarea}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F3F4F6",
    flex: 1,
    paddingTop: 39,
  },

  titulo: {
    textAlign: "center",
    fontSize: 30,
    color: "#374151",
    fontWeight: "600",
  },
  tituloBold: {
    fontSize: 30,

    textAlign: "center",
    fontWeight: "900",
    color: "#6D28D9",
  },
  addToDo: {
    backgroundColor: "#6D28D9",
    padding: 15,
    marginTop: 30,
    marginHorizontal: 20,
    borderRadius: 10,
  },

  textoBtn: {
    textAlign: "center",
    color: "#FFF",
    fontSize: 18,
    fontWeight: "900",
    textTransform: "uppercase",
  },

  noTareas: {
    marginTop: 40,
    textAlign: "center",
    fontSize: 24,
    fontWeight: "600",
  },
  listado: {
    marginTop: 50,
    marginHorizontal: 30,
  },
});
