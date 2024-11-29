import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { appFirebase } from '../firebaseConfig'; // Importa la configuración de Firebase
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';
const auth = getAuth(appFirebase);
// Esquema de validación con Yup
const validationSchema = Yup.object({
  email: Yup.string().email('Correo inválido').required('El correo es obligatorio'),
  password: Yup.string().min(6, 'La contraseña debe tener al menos 6 caracteres').required('La contraseña es obligatoria'),
});

export default function LoginScreen({ navigation }) {
  const [error, setError] = useState(null);

  const handleLogin = async (values) => {
    const { email, password } = values;

    try {
      await signInWithEmailAndPassword(auth ,email, password);  // Intenta hacer login con Firebase
      navigation.navigate('Home');  // Si el login es exitoso, navega a la pantalla principal
    } catch (error) {
      setError(error.message);  // Si hay un error (correo/contraseña incorrectos), muestra el error
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar sesión</Text>
      
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={handleLogin}
        validationSchema={validationSchema}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <>
            {error && <Text style={styles.error}>{error}</Text>}  {/* Mostrar el error general */}
            
            <TextInput
              style={styles.input}
              placeholder="Correo electrónico"
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
            />
            {touched.email && errors.email && <Text style={styles.error}>{errors.email}</Text>}

            <TextInput
              style={styles.input}
              placeholder="Contraseña"
              secureTextEntry
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
            />
            {touched.password && errors.password && <Text style={styles.error}>{errors.password}</Text>}

            <Button title="Iniciar sesión" onPress={handleSubmit} />

            <Text style={styles.link} onPress={() => navigation.navigate('SignUp')}>
              ¿No tienes cuenta? Regístrate aquí
            </Text>
          </>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
  },
  link: {
    color: 'blue',
    textAlign: 'center',
    marginTop: 20,
    textDecorationLine: 'underline',
  },
});

