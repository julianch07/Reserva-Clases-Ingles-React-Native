
import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

import { useReservas } from '../contexts/ReservasContext';
import { colors, spacing, typography } from '../theme';

export default function ReservaSolicitadaScreen({ route, navigation }) {
  const { clase, horario } = route.params;

  const {
    reservas,
    agregarReserva,
    aceptarReserva,
    rechazarReserva,
  } = useReservas();

  const reservaExistente = reservas.find(
    (reserva) =>
      reserva.claseId === clase.id &&
      reserva.horarioId === horario.id
  );

  const handleAceptar = () => {
    if (reservaExistente) {
      aceptarReserva(reservaExistente.id);
      navigation.goBack();
      return;
    }

    const resultado = agregarReserva(clase, horario);

    if (!resultado.ok) {
      return;
    }

    navigation.goBack();
  };

  const handleRechazar = () => {
    if (reservaExistente) {
      rechazarReserva(reservaExistente.id);
    }

    navigation.goBack();
  };

  return (
    <View style={styles.contenedor}>
      <Text style={styles.titulo}>Solicitud de reserva</Text>

      <Text style={styles.texto}>
        Estás solicitando una reserva para la siguiente clase:
      </Text>

      <View style={styles.tarjeta}>
        <Text style={styles.nombreClase}>{clase.titulo}</Text>

        <Text style={styles.detalle}>
          Nivel: {clase.nivel}
        </Text>

        <Text style={styles.detalle}>
          Profesor: {clase.profesor.nombre}
        </Text>

        <Text style={styles.detalle}>
          Día: {horario.dia}
        </Text>

        <Text style={styles.detalle}>
          Hora: {horario.hora}
        </Text>
      </View>

      <Pressable
        style={styles.botonAceptar}
        onPress={handleAceptar}
      >
        <Text style={styles.textoBotonAceptar}>
          Aceptar reserva
        </Text>
      </Pressable>

      <Pressable
        style={styles.botonRechazar}
        onPress={handleRechazar}
      >
        <Text style={styles.textoBotonRechazar}>
          Rechazar
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    padding: spacing.xl,
    backgroundColor: colors.fondo,
  },

  titulo: {
    ...typography.titulo,
    marginBottom: spacing.md,
  },

  texto: {
    ...typography.cuerpo,
    marginBottom: spacing.lg,
  },

  tarjeta: {
    backgroundColor: colors.superficie,
    padding: spacing.lg,
    borderRadius: 12,
    marginBottom: spacing.xl,
  },

  nombreClase: {
    ...typography.subtitulo,
    marginBottom: spacing.md,
  },

  detalle: {
    ...typography.cuerpo,
    marginBottom: spacing.sm,
  },

  botonAceptar: {
    backgroundColor: colors.primario,
    paddingVertical: spacing.md,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: spacing.md,
  },

  textoBotonAceptar: {
    color: colors.superficie,
    fontWeight: '700',
  },

  botonRechazar: {
    borderWidth: 1,
    borderColor: colors.error,
    paddingVertical: spacing.md,
    borderRadius: 8,
    alignItems: 'center',
  },

  textoBotonRechazar: {
    color: colors.error,
    fontWeight: '700',
  },
});