import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
//import { firebase } from '../firebase'; // Importa la configuración de Firebase

// Esquema de validación con Yup para el registro
const validationSchema = Yup.object({
  email: Yup.string().email('Correo inválido').required('El correo es obligatorio'),
  password: Yup.string().min(6, 'La contraseña debe tener al menos 6 caracteres').required('La contraseña es obligatoria'),
  confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Las contraseñas no coinciden').required('Confirmar la contraseña es obligatorio'),
});

export default function SignUpScreen({ navigation }) {
  const [error, setError] = useState(null);

  const handleSignUp = async (values) => {
    const { email, password } = values;

    try {
      //await firebase.auth().createUserWithEmailAndPassword(email, password); // Crea el usuario en Firebase
      navigation.navigate('Login');  // Si el registro es exitoso, redirige a la pantalla de Login
    } catch (error) {
      setError(error.message);  // Muestra el error si algo sale mal
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crear cuenta</Text>
      
      <Formik
        initialValues={{ email: '', password: '', confirmPassword: '' }}
        onSubmit={handleSignUp}
        validationSchema={validationSchema}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <>
            {error && <Text style={styles.error}>{error}</Text>} {/* Mostrar el error general */}
            
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

            <TextInput
              style={styles.input}
              placeholder="Confirmar Contraseña"
              secureTextEntry
              onChangeText={handleChange('confirmPassword')}
              onBlur={handleBlur('confirmPassword')}
              value={values.confirmPassword}
            />
            {touched.confirmPassword && errors.confirmPassword && <Text style={styles.error}>{errors.confirmPassword}</Text>}

            <Button title="Crear cuenta" onPress={handleSubmit} />
          </>
        )}
      </Formik>

      <Text style={styles.link} onPress={() => navigation.navigate('Login')}>
        ¿Ya tienes cuenta? Inicia sesión
      </Text>
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
