import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { TextInput, Button } from 'react-native-paper';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { formStyles } from '../styles';
import { registerApi } from '../api/user';

export default function RegisterForm(props) {
  const { changeForm } = props;

  const formikVar = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    onSubmit: async values => {
      //console.log(values);
      try{
        await registerApi(values)
        console.log('OK')
      }catch(error){
        console.log('ALGO ANDA MAL')
      }
    },
  });

  function initialValues() {
    return {
      username: '',
      email: '',
      password: '',
      repeatPassword: '',
    };
  }

  function validationSchema() {
    return Yup.object().shape({
      username: Yup.string()
        .min(2, 'Muy corto')
        .max(50, 'Demasiado largo')
        .required('Requerido'),
      email: Yup.string().email('Email inválido').required('Requerido'),
      password: Yup.string().required('Requerido'),
      repeatPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Las contraseñas deben coincidir')
        .required('Requerido'),
    });
  }

  return (
    <View>
      <Text>Register Form</Text>
      <TextInput
        label="Nombre usuario"
        style={formStyles.input}
        onChangeText={(text) => formikVar.setFieldValue('username', text)}
        error={formikVar.errors.username}
      />
      <TextInput
        label="Email"
        style={formStyles.input}
        onChangeText={(text) => formikVar.setFieldValue('email', text)}
        error={formikVar.errors.email}
      />
      <TextInput
        label="Password"
        style={formStyles.input}
        secureTextEntry
        onChangeText={(text) => formikVar.setFieldValue('password', text)}
        error={formikVar.errors.password}
      />
      <TextInput
        label="Repeat password"
        style={formStyles.input}
        secureTextEntry
        onChangeText={(text) => formikVar.setFieldValue('repeatPassword', text)}
        error={formikVar.errors.repeatPassword}
      />
      <Button mode="contained" style={formStyles.btnRegister} onPress={formikVar.handleSubmit}>
        Registrarse
      </Button>
      <Button mode="contained" style={formStyles.btnText} labelStyle={formStyles.btnTextLabel} onPress={changeForm}>
        Iniciar sesión
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({});
