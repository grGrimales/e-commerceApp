import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  Modal,
  TextInput,
  View,
  Pressable,
  Alert,
  ScrollView,
} from "react-native";

import colors from "../constants/colors";

const Formulario = ({
  modalVisible,
  setModalVisible,
  setTareas,
  tareas,
  tarea,
  setTarea,
}) => {
  const [id, setId] = useState("");
  const [titulo, setTitulo] = useState("");
  const [toDo, setToDo] = useState("");
  const [equipo, setEquipo] = useState("");

  useEffect(() => {
    if (Object.keys(tarea).length > 0) {
      setId(tarea.id);
      setToDo(tarea.toDo);
      setTitulo(tarea.titulo);
      setEquipo(tarea.equipo);
    }
  }, [tarea]);

  const handleTarea = () => {
    if ([titulo, tareas, equipo].includes("")) {
      Alert.alert("Error", "*Todos los campos son obligatorios");
      return;
    }

    const nuevaTarea = {
      titulo,
      toDo,
      equipo,
      fechaCreated: new Date(),
    };

    if (id) {
      // Editando
      nuevaTarea.id = id;

      const tareasActualizadas = tareas.map((tareaState) =>
        tareaState.id === nuevaTarea.id ? nuevaTarea : tareaState
      );
      setTareas(tareasActualizadas);
      setTarea({});
    } else {
      // Nuevo Registro
      nuevaTarea.id = Date.now();
      setTareas([...tareas, nuevaTarea]);
    }

    setModalVisible(!modalVisible);
    setTitulo("");
    setToDo("");
    setEquipo("");
    setId("");

    Alert.alert("Exitoso", "Nuevo ToDo Agregado");
  };

  return (
    <Modal animationType="slide" visible={modalVisible}>
      <SafeAreaView style={styles.contenido}>
        <ScrollView>
          <Text style={styles.titulo}>
            {tarea.id ? "Editar" : "Nuevo"}
            <Text style={styles.tituloBold}> {""}To Do</Text>
          </Text>

          <Pressable
            style={styles.btnCancelar}
            onPress={() => {
              setModalVisible(!modalVisible);
              setTarea({});
              setTitulo("");
              setToDo("");
              setEquipo("");
              setId("");
              console.log("cancelar");
            }}
          >
            <Text style={styles.btnCancelarTexto}>X Cancelar</Text>
          </Pressable>
          <View style={styles.campo}>
            <Text style={styles.label}>Title</Text>
            <TextInput
              style={styles.input}
              placeholder="Title"
              placeholderTextColor={"#666"}
              value={titulo}
              onChangeText={setTitulo}
            />
          </View>

          <View style={styles.campo}>
            <Text style={styles.label}>Equipo</Text>
            <TextInput
              style={styles.input}
              placeholder="Integrantes del equipo"
              placeholderTextColor={"#666"}
              value={equipo}
              onChangeText={setEquipo}
            />
          </View>
          <View style={styles.campo}>
            <Text style={styles.label}>Tareas</Text>
            <TextInput
              style={[styles.input, styles.tareasInput]}
              placeholder="Tareas"
              placeholderTextColor={"#666"}
              value={toDo}
              onChangeText={setToDo}
              multiline={true}
              numberOfLines={4}
            />
          </View>

          <Pressable style={styles.btnAdd} onPress={handleTarea}>
            <Text style={styles.btnAddTexto}>
              {" "}
              {tarea.id ? "Editar" : "Guardar"}{" "}
            </Text>
          </Pressable>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  contenido: {
    backgroundColor: colors.primary,
    flex: 1,
  },

  titulo: {
    fontSize: 30,
    fontWeight: "600",
    textAlign: "center",
    marginTop: 30,
    color: colors.colorText,
  },

  tituloBold: {
    fontWeight: "900",
  },

  btnCancelar: {
    marginVertical: 30,
    backgroundColor: "#5827A4",
    marginHorizontal: 30,
    padding: 15,
    borderRadius: 10,
  },
  btnCancelarTexto: {
    color: colors.colorText,
    textAlign: "center",
    fontWeight: "900",
    fontSize: 16,
    textTransform: "uppercase",
  },

  campo: {
    marginTop: 15,
    marginHorizontal: 30,
  },

  label: {
    color: colors.colorText,
    marginBottom: 10,
    marginTop: 15,
    fontSize: 20,
    fontWeight: "600",
  },

  input: {
    backgroundColor: colors.colorText,
    padding: 15,
    borderRadius: 10,
  },

  tareasInput: {
    height: 100,
  },

  btnAdd: {
    marginVertical: 50,
    backgroundColor: "#F59E0B",
    paddingVertical: 15,
    marginHorizontal: 30,
    borderRadius: 10,
  },
  btnAddTexto: {
    color: "#5827A4",
    textAlign: "center",
    fontWeight: "900",
    fontSize: 16,
    textTransform: "uppercase",
  },
});

export default Formulario;
