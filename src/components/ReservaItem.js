import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing } from '../theme';
import EtiquetaNivel from './EtiquetaNivel';

/**
 * Componente ReservaItem
 * Representa la tarjeta individual de una clase reservada con su información y opción de cancelación.
 */
export default function ReservaItem({ reserva, onCancelar }) {
  return (
    <View style={styles.tarjeta}>
      <View style={styles.cabecera}>
        <EtiquetaNivel nivel={reserva.nivel} />
        <Text style={styles.precio}>${reserva.precio} USD</Text>
      </View>

      <Text style={styles.titulo}>{reserva.titulo}</Text>

      <View style={styles.filaInfo}>
        <Ionicons name="person-outline" size={14} color="#4B5563" />
        <Text style={styles.textoInfo}>Prof. {reserva.profesor?.nombre || reserva.profesor}</Text>
      </View>

      <View style={styles.filaInfo}>
        <Ionicons name="time-outline" size={14} color="#4B5563" />
        <Text style={styles.textoInfo}>{reserva.duracion}</Text>
      </View>

      <Pressable
        style={({ pressed }) => [styles.botonCancelar, pressed && styles.pressed]}
        onPress={onCancelar}
      >
        <Ionicons name="trash-outline" size={14} color="#EF4444" />
        <Text style={styles.textoBotonCancelar}>Cancelar Reserva</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  tarjeta: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.md,
  },
  cabecera: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  precio: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.primario,
  },
  titulo: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.texto,
    marginBottom: spacing.sm,
  },
  filaInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  textoInfo: {
    fontSize: 13,
    color: '#4B5563',
    marginLeft: spacing.xs,
  },
  botonCancelar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.sm,
    paddingVertical: spacing.xs,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  textoBotonCancelar: {
    fontSize: 13,
    fontWeight: '600',
    color: '#EF4444',
    marginLeft: spacing.xs,
  },
  pressed: {
    opacity: 0.7,
  },
});