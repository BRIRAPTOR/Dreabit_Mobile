import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ImageBackground, Dimensions } from 'react-native';

// Obtener dimensiones de la pantalla
const { width, height } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('../images/bg2.png')} // Ruta de tu imagen de fondo
                style={styles.background}
            />

            <Text style={styles.title}>¡Dreabit!</Text>
            <Text style={styles.subtitle}>PEQUEÑOS SALTITOS HACIA LA META</Text>

            <TouchableOpacity
                style={styles.loginButton}
                onPress={() => navigation.navigate('Login')}
            >
                <Text style={styles.loginText}>Iniciar sesión</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.registerButton}
                onPress={() => navigation.navigate('SignUp')}
            >
                <Text style={styles.registerText}>Registrarse</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    background: {
        flex: 1,
        width: '100%',
        height: '100%',
        position: 'absolute',
        resizeMode: 'cover',
    },
    title: {
        fontSize: height * 0.1, // Tamaño dinámico
        color: '#00bf63',
        marginBottom: height * 0.02,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    subtitle: {
        fontSize: height * 0.025, // Tamaño dinámico
        color: '#e1e1e1',
        textAlign: 'center',
        marginBottom: height * 0.1,
    },
    loginButton: {
        height: height * 0.07, // Altura dinámica
        width: width * 0.5, // Ancho dinámico
        backgroundColor: '#e1e1e1',
        borderRadius: height * 0.035, // Radio dinámico
        borderColor: '#00bf93',
        borderWidth: 1.5,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: height * 0.03,
    },
    loginText: {
        fontSize: height * 0.03, // Tamaño dinámico
        color: '#00bf93',
        textAlign: 'center',
    },
    registerButton: {
        height: height * 0.07, // Altura dinámica
        width: width * 0.5, // Ancho dinámico
        backgroundColor: '#00bf93',
        borderRadius: height * 0.035, // Radio dinámico
        borderColor: '#e1e1e1',
        borderWidth: 1.5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    registerText: {
        fontSize: height * 0.03, // Tamaño dinámico
        color: '#efefef',
        textAlign: 'center',
    },
});

export default HomeScreen;
