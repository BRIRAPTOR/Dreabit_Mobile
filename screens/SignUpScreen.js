import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, ImageBackground, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { appFirebase } from '../firebaseConfig'; // Importa la configuración de Firebase
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

const auth = getAuth(appFirebase);

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
            await createUserWithEmailAndPassword(auth, email, password); // Crea el usuario en Firebase
            navigation.navigate('Login');  // Si el registro es exitoso, redirige a la pantalla de Login
        } catch (error) {
            setError(error.message);  // Muestra el error si algo sale mal
        }
    };

    return (
        <View style={styles.container}>
            <ImageBackground source={require("../images/bg2.png")} style={styles.background} />
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.subcontainer}>

                    {/* Imagen de la rana que se coloca en la parte superior */}
                    <Image source={require('../images/icon.png')} style={styles.frogImage} />

                    <Text style={styles.title}>REGISTRARSE</Text>

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

                                <Text style={styles.link} onPress={() => navigation.navigate('Login')}>
                                    ¿Ya tienes cuenta? Inicia sesión
                                </Text>

                                <TouchableOpacity
                                    style={styles.acceptButton}
                                    onPress={handleSubmit} // Cambié aquí, ahora se pasa handleSubmit directamente
                                >
                                    <Text style={styles.acceptText}>Aceptar</Text>
                                </TouchableOpacity>
                            </>
                        )}
                    </Formik>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',  // Centra el contenido horizontalmente
        padding: 0,
    },
    background: {
        flex: 1,
        width: '100%',
        height: '100%',
        position: 'absolute',
        resizeMode: 'cover',
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',  // Centra el contenido dentro del scrollview
        paddingVertical: 50,
        paddingHorizontal: 15,
        width: '100%',  // Asegura que el contenedor sea del 100% del ancho
    },
    subcontainer: {
        borderColor: '#e1e1e1',
        backgroundColor: '#e1e1e1',
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 30,
        paddingHorizontal: 20,
        borderRadius: 20,
        width: '100%',
        maxWidth: 400,  // Se asegura que el contenedor no sea más grande que 400px
        minWidth: 320, // Asegura un tamaño mínimo para dispositivos pequeños
    },
    frogImage: {
        width: 100,
        height: 100,
        marginBottom: 20, // Da espacio entre la imagen y el título
        resizeMode: 'contain', // Asegura que la imagen mantenga sus proporciones
    },
    title: {
        fontSize: 24,
        color: "#4e7d4b",
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 30,
    },
    input: {
        padding: 10,
        height: 50,
        width: '100%',
        maxWidth: 350,
        borderRadius: 5,
        backgroundColor: '#e1e1e1',
        color: '#8b8482',
        marginTop: 15,
        marginBottom: 10,
        borderColor: '#00bf93',
        borderWidth: 2,
    },
    error: {
        color: 'red',
        fontSize: 12,
        marginBottom: 10,
    },
    link: {
        color: '#8b8482',
        textAlign: 'center',
        marginTop: 20,
        textDecorationLine: 'underline',
    },
    acceptButton: {
        height: 60,
        width: '100%',
        maxWidth: 350,
        backgroundColor: "#00bf93",
        borderRadius: 30,
        borderColor: '#333333',
        borderWidth: 1.5,
        justifyContent: "center",
        alignItems: 'center',
        marginTop: 30,
    },
    acceptText: {
        color: "#333333",
        fontSize: 20,
        textAlign: 'center',
    },
});
