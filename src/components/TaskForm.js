import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

const TaskForm = ({ onAdd, selectedTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');

  // useEffect para actualizar los campos del formulario cuando se selecciona una tarea
  useEffect(() => {
    if (selectedTask) {
      setTitle(selectedTask.title || '');
      setDescription(selectedTask.description || '');
      setDate(selectedTask.date || '');
    }
  }, [selectedTask]);

  const handleAddTask = () => {
    // Validar que se ingresen datos obligatorios antes de agregar/editar la tarea
    if (!title.trim() || !description.trim() || !date.trim()) {
      alert('Por favor, complete todos los campos.');
      return;
    }

    const newTask = {
      id: selectedTask ? selectedTask.id : Date.now().toString(),
      title,
      description,
      date,
    };

    onAdd(newTask);
    setTitle('');
    setDescription('');
    setDate('');
  };

  return (
    <View style={styles.formContainer}>
      <TextInput
        style={styles.input}
        placeholder="Nombre de la tarea"
        value={title}
        onChangeText={(text) => setTitle(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Descripción"
        value={description}
        onChangeText={(text) => setDescription(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Fecha"
        value={date}
        onChangeText={(text) => setDate(text)}
      />
      <Button title="Guardar" onPress={handleAddTask} />
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
  },
});

export default TaskForm;
