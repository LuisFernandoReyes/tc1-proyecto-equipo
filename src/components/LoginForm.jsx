import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { TextInput, Button } from 'react-native-paper';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { formStyles } from '../styles';
import { loginApi } from '../api/user';
import useAuth from '../hooks/useAuth'

export default function LoginForm(props) {
  const { changeForm } = props;
  const {login} = useAuth()
  //console.log(auth)

  const formikVar = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    onSubmit: async values => {
      console.log(values);
      try{
        const response = await loginApi(values)
        login(response)
      }catch(error){
        console.log('ALGO ANDA MAL')
      }
    },
  });

  function initialValues() {
    return {
      identifier: '',
      password: '',
    };
  }

  function validationSchema() {
    return Yup.object().shape({
      identifier: Yup.string().email('Email inválido').required('Requerido'),
      password: Yup.string().required('Requerido'),
    });
  }

  return (
    <View>
      <Text>Login Form</Text>
      <TextInput
        label="Email"
        style={formStyles.input}
        onChangeText={(text) => formikVar.setFieldValue('identifier', text)}
        error={formikVar.errors.identifier}
      />
      <TextInput
        label="Password"
        style={formStyles.input}
        secureTextEntry
        onChangeText={(text) => formikVar.setFieldValue('password', text)}
        error={formikVar.errors.password}
      />
      
      <Button mode="contained" style={formStyles.btnRegister} onPress={formikVar.handleSubmit}>
        Iniciar sesión
      </Button>
      <Button mode="contained" style={formStyles.btnText} labelStyle={formStyles.btnTextLabel} onPress={changeForm}>
        Registrarse
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({});