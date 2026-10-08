import React from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { colors, spacing } from '../theme';
import EtiquetaNivel from './EtiquetaNivel';

/**
 * Componente Tarjeta Reutilizable (Card)
 * Muestra la imagen del curso, la etiqueta de nivel, el título, el docente,
 * el precio y los cupos disponibles.
 */
export default function Card({ clase, onPress }) {
  return (
    <Pressable
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
      onPress={onPress}
    >
      <Image source={{ uri: clase.imagen }} style={styles.portada} />
      <View style={styles.contenido}>
        <View style={styles.headerContenido}>
          <EtiquetaNivel nivel={clase.nivel} />
          <Text style={styles.precio}>${clase.precio} USD</Text>
        </View>

        <Text style={styles.titulo} numberOfLines={2}>
          {clase.titulo}
        </Text>

        <View style={styles.profesorInfo}>
          <Image source={{ uri: clase.profesor.foto }} style={styles.fotoProfesor} />
          <Text style={styles.nombreProfesor}>Prof. {clase.profesor.nombre}</Text>
        </View>

        <View style={styles.footer}>
          <Text style={styles.cupos}>👥 {clase.cupos} cupos disponibles</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.lg,
    overflow: 'hidden',
  },
  pressed: {
    opacity: 0.9,
  },
  portada: {
    width: '100%',
    height: 140,
  },
  contenido: {
    padding: spacing.md,
  },
  headerContenido: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
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
  profesorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  fotoProfesor: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: spacing.xs,
  },
  nombreProfesor: {
    fontSize: 13,
    color: '#4B5563',
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: spacing.xs,
    marginTop: spacing.xs,
  },
  cupos: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
});