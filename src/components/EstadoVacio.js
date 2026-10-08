import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing } from '../theme';

/**
 * Componente EstadoVacio
 * Muestra una interfaz limpia con icono cuando una búsqueda o lista no retorna resultados.
 */
export default function EstadoVacio({
  mensaje = 'No se encontraron clases disponibles',
  submensaje = 'Intenta buscando con otro término o seleccionando un nivel diferente'
}) {
  return (
    <View style={styles.contenedor}>
      <Ionicons name="search-outline" size={48} color="#9CA3AF" style={styles.icono} />
      <Text style={styles.titulo}>{mensaje}</Text>
      <Text style={styles.descripcion}>{submensaje}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    padding: spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.xl,
  },
  icono: {
    marginBottom: spacing.md,
  },
  titulo: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.texto,
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  descripcion: {
    fontSize: 13,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 18,
  },
});