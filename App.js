import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useMemo, useState, useSyncExternalStore } from 'react';
import { StyleSheet, Text, View, TextInput, Alert } from 'react-native';
import { PaperProvider, Button, IconButton, RadioButton } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AuthContext from './src/context/AuthContext'
import TaskManagerScreen from './src/components/TaskManagerScreen';

import Auth from './src/screens/Auth';
import { layoutStyle } from './src/styles';
import { getTokenApi, setTokenApi } from './src/api/token';

export default function App() {
  const [auth, setAuth] = useState(false)
  const [showTaskManager, setShowTaskManager] = useState(false);

  useEffect(() => {
    (async () => {
      const token = await getTokenApi()
      if(token){
        console.log('Estoy Logeado...')
        console.log(token)
        setAuth(null)
      }else{
        setAuth(null)
      }
    })()
  }, [])

  const login = user =>{
    console.log('LOGIN: ')
    console.log(user)
    setTokenApi(user.jwt)
    setAuth({
      token: user.jwt,
      idUser: user.user._id
    })
  }

  const authData = useMemo(
    () => ({
      auth,
      login,
      logout: () => null,
    }),[auth]
  )

  if(auth === undefined) return null

  const showTaskManagerScreen = () => {
    setShowTaskManager(true);
  };

  const hideTaskManagerScreen = () => {
    setShowTaskManager(false);
  };

  return (
    <AuthContext.Provider value={authData}>
      <PaperProvider>
        {auth ? (
          showTaskManager ? (
            <TaskManagerScreen onCancel={hideTaskManagerScreen} />
          ) : (
            <>
              <Text style={styles.container}>Bienvenid@s</Text>
              <Text style={styles.container}>Este es el gestor de tareas para el semestre 2023B</Text>
              <Button onPress={showTaskManagerScreen} style={styles.container}>Gestor de Tareas</Button>
              {/* Otros elementos de la Zona de Usuarios */}
            </>
          )
        ) : (
          <Auth />
        )}
      </PaperProvider>
    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems:'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
});