import React, { useState } from "react";

import { StyleSheet, Text, SafeAreaView, Pressable, Alert } from "react-native";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";

import Formulario from "./src/components/Formulario";
import { Listado } from "./src/components/Listado";
import { NoTareas } from "./src/components/NoTareas";
import colors from "./src/constants/colors";

export default function App() {
  const [loaded] = useFonts({
    RobotoBold: require("./assets/fonts/Roboto-Bold.ttf"),
    RobotoRegular: require("./assets/fonts/Roboto-Regular.ttf"),
  });

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

  let content = <NoTareas />;

  if (tareas.length >= 1) {
    content = (
      <Listado
        tareas={tareas}
        setModalVisible={setModalVisible}
        tareaEditar={tareaEditar}
        tareaEliminar={tareaEliminar}
      />
    );
  }

  if (!loaded) return <AppLoading />;
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
      {content}

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
    backgroundColor: colors.bg,
    flex: 1,
    paddingTop: 39,
    fontFamily: "RobotoRegular",
  },

  titulo: {
    textAlign: "center",
    fontSize: 30,
    color: colors.secondary,
    fontWeight: "600",
  },

  tituloBold: {
    fontSize: 30,

    textAlign: "center",
    fontWeight: "900",
    color: colors.primary,
    fontFamily: "RobotoBold",
  },
  addToDo: {
    backgroundColor: colors.primary,
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
});
