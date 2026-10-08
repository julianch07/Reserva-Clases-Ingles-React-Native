import React, { useLayoutEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import useResponsive from '../hooks/useResponsive';
import { colors, spacing, typography } from '../theme';

export default function DetalleClase({ route, navigation }) {
  const { clase } = route.params;
  const { isTablet, paddingHorizontal } = useResponsive();

  const totalHorarios = clase.horarios?.length || 0;

  useLayoutEffect(() => {
    navigation.setOptions({ title: clase.titulo });
  }, [navigation, clase.titulo]);

  return (
    <View style={styles.pantalla}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Image
          source={{ uri: clase.imagen }}
          style={[styles.portada, { height: isTablet ? 300 : 200 }]}
          resizeMode="cover"
        />

        <View style={[styles.contenido, { paddingHorizontal }]}>
          <View style={styles.badgeNivel}>
            <Text style={styles.badgeTexto}>{clase.nivel}</Text>
          </View>

          <Text style={typography.titulo}>{clase.titulo}</Text>

          <View style={styles.datos}>
            <View style={styles.dato}>
              <Ionicons
                name="time-outline"
                size={22}
                color={colors.primario}
              />
              <Text style={styles.datoValor}>{clase.duracion}</Text>
              <Text style={styles.datoEtiqueta}>Duración</Text>
            </View>

            <View style={styles.dato}>
              <Ionicons
                name="people-outline"
                size={22}
                color={colors.primario}
              />
              <Text style={styles.datoValor}>{clase.cupos}</Text>
              <Text style={styles.datoEtiqueta}>Cupos</Text>
            </View>

            <View style={styles.dato}>
              <Ionicons
                name="calendar-outline"
                size={22}
                color={colors.primario}
              />
              <Text style={styles.datoValor}>{totalHorarios}</Text>
              <Text style={styles.datoEtiqueta}>Horarios</Text>
            </View>
          </View>

          <View style={styles.profesor}>
            <Image
              source={{ uri: clase.profesor.foto }}
              style={styles.avatar}
            />

            <View>
              <Text style={styles.profesorEtiqueta}>Tu profesor</Text>
              <Text style={styles.profesorNombre}>
                {clase.profesor.nombre}
              </Text>
              <Text style={styles.profesorEtiqueta}>
                {clase.profesor.pais}
              </Text>
            </View>
          </View>

          <View>
            <Text style={styles.subtitulo}>Acerca de la clase</Text>
            <Text style={styles.descripcion}>{clase.descripcion}</Text>
          </View>

          <View style={styles.horarios}>
            <Text style={styles.subtitulo}>Horarios disponibles</Text>

            {clase.horarios?.map((horario) => (
              <View key={horario.id} style={styles.horario}>
                <Ionicons
                  name="calendar-outline"
                  size={18}
                  color={colors.primario}
                />

                <View style={styles.horarioInfo}>
                  <Text style={styles.horarioDia}>{horario.dia}</Text>
                  <Text style={styles.horarioHora}>{horario.hora}</Text>
                </View>
              </View>
            ))}
          </View>

          <Pressable
            style={({ pressed }) => [
              styles.botonReservar,
              pressed && styles.botonPresionado,
            ]}
            onPress={() => {}}
          >
            <Text style={styles.textoBotonReservar}>Reservar clase</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  pantalla: {
    flex: 1,
    backgroundColor: colors.fondo,
  },
  scrollContent: {
    paddingBottom: spacing.xl,
  },
  portada: {
    width: '100%',
    backgroundColor: colors.primarioSuave,
  },
  contenido: {
    paddingTop: spacing.lg,
    gap: spacing.lg,
  },
  badgeNivel: {
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: 20,
    backgroundColor: colors.primarioSuave,
  },
  badgeTexto: {
    color: colors.primario,
    fontWeight: '700',
  },
  datos: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: colors.superficie,
    borderRadius: 16,
    paddingVertical: spacing.lg,
    borderWidth: 1,
    borderColor: colors.borde,
  },
  dato: {
    alignItems: 'center',
    gap: 2,
  },
  datoValor: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.texto,
  },
  datoEtiqueta: {
    fontSize: 12,
    color: colors.textoSuave,
  },
  profesor: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: colors.superficie,
    borderRadius: 16,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.borde,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.borde,
  },
  profesorEtiqueta: {
    fontSize: 12,
    color: colors.textoSuave,
  },
  profesorNombre: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.texto,
  },
  subtitulo: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.texto,
  },
  descripcion: {
    ...typography.cuerpo,
    color: colors.textoSuave,
    lineHeight: 22,
    marginTop: spacing.sm,
  },
  horarios: {
    gap: spacing.sm,
  },
  horario: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.superficie,
    borderRadius: 12,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.borde,
    gap: spacing.sm,
  },
  horarioInfo: {
    gap: 2,
  },
  horarioDia: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.texto,
  },
  horarioHora: {
    fontSize: 13,
    color: colors.textoSuave,
  },
  botonReservar: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
    paddingHorizontal: spacing.lg,
    borderRadius: 12,
    backgroundColor: colors.primario,
  },
  botonPresionado: {
    opacity: 0.8,
  },
  textoBotonReservar: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.superficie,
  },
});
