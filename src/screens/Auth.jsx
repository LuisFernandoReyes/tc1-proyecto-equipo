import React, { useState } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { layoutStyle } from '../styles/index';
import logo from '../../assets/icon.png';
import RegisterForm from '../components/RegisterForm';
import LoginForm from '../components/LoginForm';

export default function Auth() {
  const [showLogin, setShowLogin] = useState(true);

  const changeForm = ()=>{
    setShowLogin(!showLogin)
  }

  return (
    <View style={layoutStyle.container}>
      <Image style={styles.logo} source={logo} />
      {showLogin ? 
        <LoginForm changeForm={changeForm}  /> 
        : <RegisterForm  
        changeForm={changeForm}  
      />}
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: '100%',
    height: 80,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'green',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
  button: {
    backgroundColor: '#DDDDDD',
    padding: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
});