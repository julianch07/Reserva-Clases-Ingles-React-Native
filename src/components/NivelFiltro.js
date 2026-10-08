import React from 'react';
import { ScrollView, Text, Pressable, StyleSheet } from 'react-native';
import { colors, spacing } from '../theme';

/**
 * Componente NivelFiltro
 * Renderiza una barra horizontal desplazable con botones de selección (chips)
 * para filtrar las clases según el nivel de dificultad seleccionado.
 */
export default function NivelFiltro({ niveles, nivelSeleccionado, onSeleccionarNivel }) {
  return (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false} 
      contentContainerStyle={styles.container}
    >
      {niveles.map((nivel) => {
        const activo = nivelSeleccionado === nivel;
        return (
          <Pressable
            key={nivel}
            style={({ pressed }) => [
              styles.chip,
              activo && styles.chipActivo,
              pressed && styles.pressed,
            ]}
            onPress={() => onSeleccionarNivel(nivel)}
          >
            <Text style={[styles.textoChip, activo && styles.textoChipActivo]}>
              {nivel}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  chip: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    borderWidth: 1,
    borderColor: colors.border,
    marginRight: spacing.sm,
  },
  chipActivo: {
    backgroundColor: colors.primario,
    borderColor: colors.primario,
  },
  pressed: {
    opacity: 0.8,
  },
  textoChip: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.texto,
  },
  textoChipActivo: {
    color: '#FFFFFF',
  },
});