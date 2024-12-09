import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, ImageBackground } from "react-native";

export default function App() {
    return (
        <ImageBackground
            source={require("../images/bg.png")} // Cambia esta ruta por la de tu imagen de fondo
            style={styles.background}
            resizeMode="cover" // Esto asegura que la imagen cubra toda el área
        >
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.mainContainer}>
                    {/* Header */}
                    <View style={styles.header}>
                        <Image
                            source={require("../images/icon.png")} // Cambia esta ruta por la del ícono
                            style={styles.icon}
                        />
                        <Text style={styles.date}>viernes{'\n'}8 noviembre</Text>
                        <TouchableOpacity style={styles.calendar}>
                            <Text style={styles.calendarText}>📅</Text>
                        </TouchableOpacity>
                        <View style={styles.profile}>
                            <Image
                                source={require("../images/google.png")} // Cambia esta ruta por la imagen de tu perfil
                                style={styles.profileImage}
                            />
                        </View>
                    </View>

                    {/* Tareas del día */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Tareas del día</Text>
                        <View style={styles.subcontainer}>
                            <View style={styles.taskCardPink}>
                                <TaskItem text="Proyectos personales y hobbies" />
                                <TaskItem text="Estudio intensivo" />
                                <TaskItem text="blablabla" />
                            </View>
                        </View>
                    </View>

                    {/* Tareas pendientes */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Tareas Pendientes</Text>
                        <View style={styles.subcontainer}>
                            <View style={styles.taskCardGreen}>
                                <TaskItem text="Diseño DREABIT" />
                                <TaskItem text="Tareas Pendientes" />
                            </View>
                        </View>
                    </View>

                    {/* Botón flotante */}
                    <TouchableOpacity style={styles.addButton}>
                        <Text style={styles.addButtonText}>+</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            {/* Barra de navegación inferior */}
            <View style={styles.bottomNav}>
                <TouchableOpacity>
                    <Text style={styles.navIcon}>⚡</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={styles.navIcon}>🏠</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={styles.navIcon}>🎯</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
}

function TaskItem({ text }) {
    return (
        <View style={styles.taskItem}>
            <Text style={styles.taskText}>{text}</Text>
            <Text style={styles.taskCheck}>✔</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        height: '100%',
        position: 'absolute',
        resizeMode: 'cover',
    },
    scrollContainer: {
        flexGrow: 1,
        paddingBottom: 80,  // Asegura que el contenido no quede cubierto por la barra de navegación
    },
    mainContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo semitransparente para mejorar la visibilidad
        borderRadius: 20,
        marginHorizontal: 15,
        marginTop: 50,
        paddingBottom: 50,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 20,
    },
    icon: {
        width: 50,
        height: 50,
    },
    date: {
        color: "#fff",
        fontSize: 16,
        textAlign: "center",
    },
    calendar: {
        backgroundColor: "#fff",
        padding: 5,
        borderRadius: 10,
    },
    calendarText: {
        fontSize: 18,
    },
    profile: {
        borderRadius: 50,
        overflow: "hidden",
    },
    profileImage: {
        width: 50,
        height: 50,
    },
    section: {
        padding: 20,
    },
    sectionTitle: {
        color: "#fff",
        fontSize: 18,
        marginBottom: 10,
    },
    subcontainer: {
        backgroundColor: "#e1e1e1",
        borderRadius: 20,
        padding: 15,
        marginBottom: 20,
        width: "100%",
        alignSelf: "center",
    },
    taskCardPink: {
        backgroundColor: "#ff758c",
        borderRadius: 10,
        padding: 15,
    },
    taskCardGreen: {
        backgroundColor: "#00ff73",
        borderRadius: 10,
        padding: 15,
    },
    taskItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 10,
    },
    taskText: {
        color: "#fff",
        fontSize: 16,
    },
    taskCheck: {
        color: "#fff",
        fontSize: 18,
    },
    addButton: {
        backgroundColor: "#00ff73",
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        bottom: 80,
        right: 20,
    },
    addButtonText: {
        color: "#fff",
        fontSize: 30,
    },
    bottomNav: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 15,
        backgroundColor: "#333",
        position: "absolute",
        bottom: 0,
        width: "100%",
    },
    navIcon: {
        color: "#fff",
        fontSize: 24,
    },
});
