import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import TaskList from './TaskList';
import TaskForm from './TaskForm';
import { layoutStyle } from '../styles';

const TaskManagerScreen = ({ onCancel }) => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleAddTask = (newTask) => {
    if (isEditing) {
      // Si está en modo de edición, actualiza la tarea existente
      const updatedTasks = tasks.map((task) =>
        task.id === selectedTask.id ? { ...task, ...newTask } : task
      );
      setTasks(updatedTasks);
      setSelectedTask(null);
      setIsEditing(false);
    } else {
      // Si no está en modo de edición, agrega una nueva tarea
      setTasks([...tasks, newTask]);
    }
  };

  const handleDeleteTask = (task) => {
    const updatedTasks = tasks.filter((t) => t.id !== task.id);
    setTasks(updatedTasks);
    setSelectedTask(null);
    setIsEditing(false); // Limpiar el modo de edición si se elimina la tarea seleccionada
  };

  const handleSelectTask = (task) => {
    setSelectedTask(task);
    setIsEditing(true); // Activar el modo de edición al seleccionar una tarea
  };

  const handleEditTask = () => {
    // La lógica de edición ahora está en handleAddTask
    console.log('Editar tarea:', selectedTask);
  };

  const handleOtherAction = () => {
    // Aquí puedes implementar otras acciones con la tarea seleccionada
    console.log('Otra acción con la tarea:', selectedTask);
  };

  return (
    <View style={layoutStyle.container}>
      <Text style={styles.title}>Gestor de Tareas</Text>
      <TaskForm onAdd={handleAddTask} selectedTask={selectedTask} />
      <TaskList tasks={tasks} onDelete={handleDeleteTask} onSelect={handleSelectTask} />
      {selectedTask && (
        <View style={styles.selectedTaskContainer}>
          <Text>{`Tarea seleccionada: ${selectedTask.title}`}</Text>
          <Text>{`Descripción: ${selectedTask.description}`}</Text>
          <Text>{`Fecha: ${selectedTask.date}`}</Text>
          <View style={styles.buttonContainer}>
            <Button title="Editar" onPress={handleEditTask} />
            <Button title="Otra acción" onPress={handleOtherAction} />
          </View>
        </View>
      )}
      <View style={styles.buttonContainer}>
        <Button title="Cancelar" onPress={onCancel} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  selectedTaskContainer: {
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    backgroundColor: '#DDDDDD',
    padding: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
});

export default TaskManagerScreen;
