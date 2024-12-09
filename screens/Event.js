import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ImageBackground, Modal, TextInput, Button, Alert } from 'react-native';
import { Calendar } from 'react-native-calendars';
export default function App({ navigation }) {
    const [selectedDate, setSelectedDate] = useState('2024-11-08');  // Fecha seleccionada por defecto
    const [events, setEvents] = useState({
        '2024-11-08': [{ name: 'Examen de inglés', time: '4:00 - 5:00' }],
        '2024-11-10': [{ name: 'Reunión con el equipo', time: '2:00 - 3:00' }],
    });

    const [isModalVisible, setIsModalVisible] = useState(false);  // Estado para mostrar el modal
    const [eventName, setEventName] = useState('');  // Estado para el nombre del evento
    const [eventTime, setEventTime] = useState('');  // Estado para la hora del evento
    const [errorMessage, setErrorMessage] = useState('');  // Mensaje de error

    const handleDayPress = (day) => {
        setSelectedDate(day.dateString);  // Actualiza la fecha seleccionada
    };

    const getMarkedDates = () => {
        const marked = {};
        for (const date in events) {
            marked[date] = { marked: true, dotColor: 'red', selected: date === selectedDate };
        }
        return marked;
    };

    const validateTimeFormat = (time) => {
        const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)\s*-\s*([01]\d|2[0-3]):([0-5]\d)$/;
        return timeRegex.test(time);
    };

    const addEvent = () => {
        if (!eventName.trim()) {
            setErrorMessage('El nombre del evento no puede estar vacío.');
            return;
        }

        if (!validateTimeFormat(eventTime)) {
            setErrorMessage('La hora debe estar en el formato HH:mm - HH:mm (ej. 14:00 - 15:00).');
            return;
        }

        const newEvent = { name: eventName, time: eventTime };
        setEvents((prevEvents) => {
            const updatedEvents = { ...prevEvents };
            if (updatedEvents[selectedDate]) {
                updatedEvents[selectedDate].push(newEvent);
            } else {
                updatedEvents[selectedDate] = [newEvent];
            }
            return updatedEvents;
        });

        // Resetea los campos y cierra el modal
        setEventName('');
        setEventTime('');
        setErrorMessage('');
        setIsModalVisible(false);
    };

    return (
        <ImageBackground
            source={require('../images/bg.png')}  // Aquí puedes poner la ruta de tu fondo
            style={styles.background}
            resizeMode="cover"
        >
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.mainContainer}>
                    {/* Header */}
                    <View style={styles.header}>
                        <Text style={styles.month}>NOVIEMBRE</Text>
                        <Text style={styles.year}>2024</Text>
                    </View>

                    {/* Calendario */}
                    <Calendar
                        current={selectedDate}  // Muestra la fecha actual por defecto
                        onDayPress={handleDayPress}  // Maneja la selección de un día
                        markedDates={getMarkedDates()}  // Función que genera las fechas marcadas
                        monthFormat={'yyyy MM'}  // Formato del mes (año y mes)
                        hideArrows={false}  // Mostrar las flechas para navegar entre meses
                        enableSwipeMonths={true}  // Permite deslizar para navegar entre los meses
                        style={styles.calendar}
                        theme={{
                            todayTextColor: '#00ff73',
                            dayTextColor: '#4788ef',
                            selectedDayBackgroundColor: '#00ff73',
                            selectedDayTextColor: '#0b0909',
                            arrowColor: '#aa0000',
                        }}
                    />

                    {/* Sección de eventos */}
                    <View style={styles.eventsSection}>
                        <Text style={styles.eventsTitle}>Eventos</Text>
                        {events[selectedDate] ? (
                            events[selectedDate].map((event, index) => (
                                <View key={index} style={styles.eventCard}>
                                    <Text style={styles.eventType}>Evento</Text>
                                    <Text style={styles.eventDescription}>{event.name} {event.time}</Text>
                                </View>
                            ))
                        ) : (
                            <Text style={styles.noEvents}>No hay eventos para este día.</Text>
                        )}
                    </View>

                    {/* Botón para agregar evento */}
                    <TouchableOpacity style={styles.addEventButton} onPress={() => setIsModalVisible(true)}>
                        <Text style={styles.addEventButtonText}>Agregar Evento</Text>
                    </TouchableOpacity>

                    {/* Modal para agregar evento */}
                    <Modal
                        visible={isModalVisible}
                        animationType="slide"
                        transparent={true}
                        onRequestClose={() => setIsModalVisible(false)}
                    >
                        <View style={styles.modalOverlay}>
                            <View style={styles.modalContainer}>
                                <Text style={styles.modalTitle}>Agregar Evento</Text>

                                <TextInput
                                    style={styles.input}
                                    placeholder="Nombre del evento"
                                    value={eventName}
                                    onChangeText={setEventName}
                                />
                                {errorMessage.includes('nombre') && <Text style={styles.errorText}>{errorMessage}</Text>}

                                <TextInput
                                    style={styles.input}
                                    placeholder="Hora del evento (HH:mm - HH:mm)"
                                    value={eventTime}
                                    onChangeText={setEventTime}
                                    keyboardType="default"
                                />
                                {errorMessage.includes('hora') && <Text style={styles.errorText}>{errorMessage}</Text>}

                                <View style={styles.modalButtons}>
                                    <TouchableOpacity
                                        style={[styles.button, styles.cancelButton]}
                                        onPress={() => setIsModalVisible(false)}
                                    >
                                        <Text style={styles.buttonText}>Cancelar</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[styles.button, styles.saveButton]}
                                        onPress={addEvent}
                                    >
                                        <Text style={styles.buttonText}>Guardar</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </Modal>
                </View>
            </ScrollView>
        </ImageBackground>
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
        paddingBottom: 80,
    },
    mainContainer: {
        flex: 1,
        borderRadius: 20,
        marginHorizontal: 15,
        marginTop: 50,
        paddingBottom: 50,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    month: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
        marginRight: 5,
    },
    year: {
        color: '#fff',
        fontSize: 18,
    },
    calendar: {
        marginTop: 20,
    },
    eventsSection: {
        padding: 20,
    },
    eventsTitle: {
        color: '#fff',
        fontSize: 18,
        marginBottom: 10,
    },
    eventCard: {
        backgroundColor: '#00bf93',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
    },
    eventType: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    eventDescription: {
        color: '#fff',
        fontSize: 14,
    },
    noEvents: {
        color: '#fff',
        fontSize: 14,
        fontStyle: 'italic',
    },
    addEventButton: {
        backgroundColor: '#00bf93',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    addEventButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    modalOverlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.7)", // Fondo oscuro translúcido
    },
    modalContainer: {
        width: "80%",
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 20,
        marginBottom: 20,
        color: "#333",
        fontWeight: "bold",
    },
    input: {
        width: "100%",
        height: 50,
        backgroundColor: "#f0f0f0",
        marginBottom: 10,
        paddingLeft: 15,
        borderRadius: 5,
        color: "#333",
    },
    modalButtons: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 20,
        width: "100%",
    },
    button: {
        flex: 1,
        padding: 15,
        borderRadius: 5,
        alignItems: "center",
        marginHorizontal: 5,
    },
    cancelButton: {
        backgroundColor: "#f44336",
    },
    saveButton: {
        backgroundColor: "#00bf93",
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    errorText: {
        color: "red",
        fontSize: 14,
        marginBottom: 10,
        textAlign: "left",
        width: "100%",
    },

});
