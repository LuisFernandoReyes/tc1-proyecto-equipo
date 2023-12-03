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
      const updatedTasks = tasks.map((task) =>
        task.id === selectedTask.id ? { ...task, ...newTask } : task
      );
      setTasks(updatedTasks);
      setSelectedTask(null);
      setIsEditing(false);
    } else {
      setTasks([...tasks, newTask]);
    }
  };

  const handleDeleteTask = (task) => {
    const updatedTasks = tasks.filter((t) => t.id !== task.id);
    setTasks(updatedTasks);
    setSelectedTask(null);
    setIsEditing(false);
  };

  const handleSelectTask = (task) => {
    setSelectedTask(task);
    setIsEditing(true);
  };

  const handleEditTask = () => {
    console.log('Editar tarea:', selectedTask);
  };

  const handleOtherAction = () => {
    console.log('Otra acción con la tarea:', selectedTask);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gestor de Tareas</Text>
      <TaskForm onAdd={handleAddTask} selectedTask={selectedTask} />
      <TaskList tasks={tasks} onDelete={handleDeleteTask} onSelect={handleSelectTask} />
      {selectedTask && (
        <View style={styles.selectedTaskContainer}>
          <Text style={styles.selectedTaskText}>{`Tarea seleccionada: ${selectedTask.title}`}</Text>
          <Text style={styles.selectedTaskText}>{`Descripción: ${selectedTask.description}`}</Text>
          <Text style={styles.selectedTaskText}>{`Fecha: ${selectedTask.date}`}</Text>
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
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
    marginTop: 70,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  selectedTaskContainer: {
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  selectedTaskText: {
    marginBottom: 5,
  },
  buttonContainer: {
    backgroundColor: '#DDDDDD',
    padding: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
});

export default TaskManagerScreen;
