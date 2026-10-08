import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing } from '../theme';

// Componente funcional con desestructuración de props
export default function EtiquetaNivel({ nivel }) {
  return (
    <View style={styles.contenedor}>
      <Text style={styles.texto}>
        {nivel}
      </Text>
    </View>
  );
}

// Hoja de estilos del componente
const styles = StyleSheet.create({
  contenedor: {
    alignSelf: 'flex-start',
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.border,
    borderRadius: 4,
  },
  texto: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.texto,
    letterSpacing: 0.3,
  },
});
